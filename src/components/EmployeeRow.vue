<script setup>
import DeleteEmployee from './DeleteEmployee.vue';
import { defineProps, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getDateStatus } from '@/helpers/date-time';
import { getEmpStatusBadgeClass } from '../helpers/badges';
import axios from 'axios';
import { useToast } from 'vue-toastification';

defineProps({
    employee: Object
})

const isModalOpen = ref(false);
const selectedId = ref(false);
const toast = useToast();

const openModal = id => {
    selectedId.value = id;
    isModalOpen.value = true;
}

const handleDelete = async () => {
    try {
        await axios.delete(`/api/employees/${selectedId.value}`);
        toast.success('Employee deleted successfully');
    } catch (e) {
        console.log('something went wrong' + e);
        toast.error('something went wrong');
    }
}
</script>

<template>
    <tr class="hover:bg-slate-50 border-b border-slate-200">
        <td class="p-4 py-5">
            <p class="block font-semibold text-sm text-slate-800">{{ employee.id }}</p>
        </td>
        <td class="p-4 py-5">
            <p class="text-sm text-slate-500">{{ employee.name }}</p>
        </td>
        <td class="p-4 py-5">
            <p class="text-sm text-slate-500">{{ employee.occupation }}</p>
        </td>
        <td class="p-4 py-5">
            <p class="text-sm text-slate-500">{{ employee.department }}</p>
        </td>
        <td class="p-4 py-5">
            <p class="text-sm text-slate-500">
                <span 
                    class="text-gray-500 p-1 px-2 mb-4 rounded-sm" 
                    :class="getEmpStatusBadgeClass(getDateStatus(employee.startDate, employee.endDate))"
                    >
                    {{ getDateStatus(employee.startDate, employee.endDate) }}
                </span>
            </p>
        </td>
        <td class="p-4 py-5">
            <p class="text-sm text-slate-500">
                <span 
                    class="text-gray-500 p-1 px-2 mb-4 rounded-sm" 
                    :class="getEmpStatusBadgeClass(getDateStatus(employee.startDate, employee.endDate, false))"
                    >
                    {{ getDateStatus(employee.startDate, employee.endDate, false) }}
                </span>
            </p>
        </td>
        <td class="p-4 py-5 flex gap-2 justify-between">
            <RouterLink :to="'/employees/view/' + employee.id"
                class="flex justify-center items-center relative h-10 max-h-[40px] w-15 max-w-[60px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-green-500 border-2 transition-all hover:bg-green-100 active:bg-green-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <i class="pi pi-eye" style="font-size: 1rem"></i>
            </RouterLink>
            <RouterLink :to="'/employees/edit/' + employee.id"
                class="flex justify-center items-center relative h-10 max-h-[40px] w-15 max-w-[60px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-500 border-2 transition-all hover:bg-blue-100 active:bg-blue-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <i class="pi pi-file-edit" style="font-size: 1rem"></i>
            </RouterLink>
            <button
                class="flex justify-center items-center relative h-10 max-h-[40px] w-15 max-w-[60px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-red-500 border-2 transition-all hover:bg-red-100 active:bg-red-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button" @click="openModal(employee.id)">
                <i class="pi pi-trash" style="font-size: 1rem"></i>
            </button>
            <DeleteEmployee :visible="isModalOpen" @close="isModalOpen = false" @cancel="isModalOpen = false"
                @confirm="handleDelete" />
        </td>
    </tr>
</template>