<script setup>
import EmployeeData from '@/assets/data/employees.json';
import EmployeeRow from './EmployeeRow.vue';
import Pagination from './Pagination.vue';
import { ref, defineProps } from 'vue';

const employeeData = ref(EmployeeData);

defineProps({
    limit: Number,
    showPagination: {
        type: Boolean,
        default: true,
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
            <div class="my-3">
                <div class="w-full max-w-md min-w-[200px] relative">
                    <div class="relative">
                        <input
                            class="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Search for employee..." />
                        <button class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                                stroke="currentColor" class="w-8 h-8 text-slate-600">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
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
                    <EmployeeRow 
                        v-for="employee in employeeData.slice(0, limit || employeeData.length)" 
                        :key="employee.id" 
                        :employee="employee" 
                        />
                </tbody>
            </table>
            <Pagination v-if="showPagination" />
        </div>
    </section>
</template>