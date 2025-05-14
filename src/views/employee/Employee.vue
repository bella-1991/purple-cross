<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import BackButton from '@/components/BackButton.vue';
import { getDateStatus, formatDate } from '@/helpers/date-time';
import { useToast } from 'vue-toastification';
import { getEmpStatusBadgeClass, getTypeBadgeClass } from '../../helpers/badges';

const route = useRoute();
const empId = route.params.id;
const router = useRouter();
const toast = useToast();
const state = reactive({
    employee: {},
    isLoading: true,
});

const deleteEmployee = async () => {
    try {
        await axios.delete(`/api/employees/${empId}`);
        toast.success('Employee deleted successfully');
        router.push('/employees');
    } catch (e) {
        console.log('something went wrong' + e);
        toast.error('something went wrong');
    }
}

onMounted(async () => {
    try {
        const response = await axios.get(`/api/employees/${empId}`);
        state.employee = response.data;
    } catch (e) {
        console.log('Error fetching data', e);
    } finally {
        state.isLoading = false;
    }
});

const formatSalary = salary => {
    return (parseInt(salary)).toLocaleString({
        style: 'currency',
        currency: 'USD',
    })
}
</script>

<template>
    <BackButton />
    <section v-if="!state.isLoading" class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="flex flex-col lg:flex-row w-full gap-6">
                <div class="flex-1">
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left relative">
                        <span :class="getTypeBadgeClass(state.employee.type)"
                            class="text-gray-500 p-1 px-2 mb-4 rounded-sm">{{ state.employee.type }}</span>
                        <h1 class="text-3xl font-bold mb-4 mt-2">{{ state.employee.name }}</h1>
                        <p class="mb-4">{{ state.employee.occupation }}</p>
                        <label class="text-slate-500">{{ state.employee.department }}</label>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h4 class="text-green-800 text-2xl font-bold mb-6">
                            Job Details
                        </h4>

                        <hr class="my-4" />

                        <h3 class="text-slate-800 text-base font-bold mb-2">Position</h3>
                        <p class="mb-4">{{ state.employee.occupation }}</p>

                        <h3 class="text-slate-800 text-base font-bold mb-2">Start Date</h3>
                        <p class="mb-4">{{ formatDate(state.employee.startDate, 'DD.MM.YYYY', '-', 'en-GB') }} - 
                            <span 
                                class="text-gray-500 p-1 px-2 mb-4 rounded-sm" 
                                :class="getEmpStatusBadgeClass(getDateStatus(state.employee.startDate, state.employee.endDate))">
                                {{ getDateStatus(state.employee.startDate, state.employee.endDate) }}
                            </span>
                        </p>

                        <h3 class="text-slate-800 text-base font-bold mb-2">End Date</h3>
                        <p class="mb-4">{{ formatDate(state.employee.endDate, 'DD.MM.YYYY', '-', 'en-GB') }} - 
                            <span class="text-gray-500 p-1 px-2 mb-4 rounded-sm" :class="getEmpStatusBadgeClass(getDateStatus(state.employee.startDate, state.employee.endDate, false))">{{ getDateStatus(state.employee.startDate, state.employee.endDate, false) }}</span>
                        </p>

                        <h3 class="text-slate-800 text-base font-bold mb-2">Salary</h3>
                        <p class="mb-4">${{ formatSalary(state.employee.salary) }} / year</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">
                            Personal Details
                        </h3>

                        <hr class="my-4" />

                        <h3 class="text-slate-800 text-base font-bold mb-2">Address</h3>
                        <p class="mb-4">
                            {{ state.employee.address.suite }},
                            {{ state.employee.address.street }},
                            {{ state.employee.address.city }},
                            {{ state.employee.address.zipcode }}
                        </p>

                        <h3 class="text-slate-800 text-base font-bold mb-2">Phone</h3>
                        <p class="mb-4">{{ state.employee.phone }}</p>

                        <h3 class="text-slate-800 text-base font-bold mb-2">Website</h3>
                        <p class="mb-4">{{ state.employee.website }}</p>
                    </div>
                </div>

                <aside>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Notes</h3>

                        <h2 class="text-2xl">{{ state.employee.name }}</h2>

                        <p class="my-2">
                            {{ state.employee.description }}
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">
                            {{ state.employee.email }}
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">{{ state.employee.phone }}</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="'/employees/edit/' + state.employee.id"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit Employee
                        </RouterLink>
                        <button
                            @click="deleteEmployee"
                            class="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Employee
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <div v-else="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
    </div>
</template>