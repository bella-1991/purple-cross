<script setup>
import EmployeeRow from './EmployeeRow.vue';
import Pagination from './Pagination.vue';
import { ref, defineProps, onMounted } from 'vue';
import { DefaultFilters as defaultValues } from "../constants";
import { getSortedEmployees } from '../helpers/employees';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

defineProps({
    limit: Number,
    showPagination: {
        type: Boolean,
        default: true,
    }
})

const rpp = ref(4);
const allEmployees = ref(null);
const sortedEmployees = ref(null);
const numberOfResults = ref(null);
const pages = ref(null);
const page = ref(1);
const indexOfLast = ref(0);
const indexOfFirst = ref(0);
let sortAsc = ref(true);
let sort = ref('');
let searchStr = ref('');
let isLoading = true;
let occupations = ref(null);
let departments = ref(null);
let occupation = ref();
let department = ref();

const handlePageClick = pageNum => {
    const results = getSortedEmployees(allEmployees.value, pageNum, { rpp: rpp.value, search: searchStr.value });

    allEmployees.value = results.allEmployees;
    sortedEmployees.value = results.sortedEmployees;
    numberOfResults.value = results.numberOfResults;
    pages.value = results.pages;
    page.value = pageNum;
    const lastVal = pageNum * rpp.value;
    indexOfLast.value = lastVal > results.numberOfResults ? results.numberOfResults : lastVal;
    indexOfFirst.value = pageNum === 1 ? 1 : pageNum === pages.value ? indexOfLast.value - (results.numberOfResults % rpp.value) : indexOfLast.value - rpp.value;
}

const handleInput = (event) => {
    searchStr.value = event.target.value;
    const results = getSortedEmployees(allEmployees.value, 1, { rpp: rpp.value, search: searchStr.value });

    allEmployees.value = results.allEmployees;
    sortedEmployees.value = results.sortedEmployees;
    numberOfResults.value = results.numberOfResults;
    pages.value = results.pages;
    page.value = 1;
    const lastVal = page.value * rpp.value;
    indexOfLast.value = lastVal > results.numberOfResults ? results.numberOfResults : lastVal;
    indexOfFirst.value = page.value === 1 ? 1 : page.value === pages.value ? indexOfLast.value - (results.numberOfResults % rpp.value) : indexOfLast.value - rpp.value;
}

const sortTable = column => {
    const results = getSortedEmployees(allEmployees.value, 1, { rpp: rpp.value, search: searchStr.value, sort: column, asc: sortAsc.value });

    allEmployees.value = results.allEmployees;
    sortedEmployees.value = results.sortedEmployees;
    numberOfResults.value = results.numberOfResults;
    pages.value = results.pages;
    page.value = 1;
    const lastVal = page.value * rpp.value;
    indexOfLast.value = lastVal > results.numberOfResults ? results.numberOfResults : lastVal;
    indexOfFirst.value = page.value === 1 ? 1 : page.value === pages.value ? indexOfLast.value - (results.numberOfResults % rpp.value) : indexOfLast.value - rpp.value;
    sortAsc.value = !sortAsc.value;
}

const handleSelect = () => {
    const results = getSortedEmployees(allEmployees.value, 1, { 
        rpp: rpp.value, search: searchStr.value, occupation: occupation.value, department: department.value 
    });
    
    allEmployees.value = results.allEmployees;
    sortedEmployees.value = results.sortedEmployees;
    numberOfResults.value = results.numberOfResults;
    pages.value = results.pages;
    page.value = 1;
    const lastVal = page.value * rpp.value;
    indexOfLast.value = lastVal > results.numberOfResults ? results.numberOfResults : lastVal;
    indexOfFirst.value = page.value === 1 ? 1 : page.value === pages.value ? indexOfLast.value - (results.numberOfResults % rpp.value) : indexOfLast.value - rpp.value;
}

onMounted(async () => {
    try {
        const response = await axios.get('/api/employees');
        const results = getSortedEmployees(response.data, 1, { rpp: rpp.value, search: searchStr.value });

        allEmployees.value = results.allEmployees;
        sortedEmployees.value = results.sortedEmployees;
        numberOfResults.value = results.numberOfResults;
        pages.value = results.pages;
        indexOfLast.value = page.value * rpp.value;
        indexOfFirst.value = page.value === 1 ? 1 : indexOfLast.value - rpp.value;
        occupations.value = results.allEmployees.map(emp => emp.occupation).filter((val, index, array) => array.indexOf(val) === index);
        departments.value = results.allEmployees.map(emp => emp.department).filter((val, index, array) => array.indexOf(val) === index);
    } catch (e) {
        console.log('Error fetching data', e);
    } finally {
        isLoading = false;
    }
})
</script>

<template>
    <section class="p-4">
        <div class="w-full flex flex-col md:flex-row justify-between md:items-center mb-3 mt-1">
            <div>
                <h3 class="text-lg font-semibold text-slate-800">List of Employees</h3>
                <p class="text-slate-500">Overview of the current employees.</p>
            </div>
            <div v-if="isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>
            <div v-else class="my-3">
                <div class="flex flex-col md:flex-row gap-2 relative">

                    <div class="relative w-full">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Search</label>
                        <div class="relative">
                            <input :value="searchStr" @input="handleInput"
                                class="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                placeholder="Search for employee..." />
                            <button
                                class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                                    stroke="currentColor" class="w-8 h-8 text-slate-600 pointer-events-none">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="mb-4 flex flex-col w-full">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Filter by Department:
                        </label>
                        <select v-model="department" @change="handleSelect()" id="type" name="type"
                            class="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            required>
                            <option>Select</option>
                            <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                        </select>
                    </div>

                    <div class="mb-4 flex flex-col w-full">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Filter by Occupation:
                        </label>
                        <select v-model="occupation" @change="handleSelect()" id="type" name="type"
                            class="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            required>
                            <option>Select</option>
                            <option v-for="occ in occupations" :key="occ" :value="occ">{{ occ }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table class="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Employee ID
                                <button @click="sortTable('id')" class="cursor-pointer">
                                    <i v-if="sortAsc" class="pi pi-sort-amount-down-alt text-slate-500"></i>
                                    <i v-else class="pi pi-sort-amount-up-alt text-slate-500"></i>
                                </button>
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Employee Full Name
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Occupation
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Department
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Date of Employment
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Termination Date
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Actions
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <EmployeeRow v-for="employee in sortedEmployees" :key="employee.id" :employee="employee" />
                </tbody>
            </table>
            <Pagination v-if="showPagination" :start="indexOfFirst" :end="indexOfLast" :totalResults="numberOfResults"
                :pages="pages" :page="page" @page-clicked="handlePageClick" />
        </div>
    </section>
</template>