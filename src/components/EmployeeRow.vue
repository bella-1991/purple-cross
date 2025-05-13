<script setup>
import DeleteEmployee from './DeleteEmployee.vue';
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
    employee: Object
})

const isModalOpen = ref(false)

function getDateStatus(startDate, endDate, start = true) {
    const [day, month, year] = startDate.split('-');
    const [day1, month1, year1] = endDate.split('-');
    const formattedStartDate = new Date(year, month - 1, day);
    const formattedEndDate = new Date(year1, month1 - 1, day1);
    const today = new Date();

    if (formattedStartDate < today) {
        if (endDate && formattedEndDate < today) {
            return start ? 'Past Employee' : 'Terminated'
        } else if (endDate && formattedEndDate > today) {
            return start ? 'Currently Employeed' : 'To Be Terminated'
        } else if (!endDate) {
            return  'Currently Employed';
        }
    } else if (formattedStartDate > today) {
        return 'Employeed Soon'
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
            <p class="text-sm text-slate-500">{{ getDateStatus(employee.startDate, employee.endDate) }}</p>
        </td>
        <td class="p-4 py-5">
            <p class="text-sm text-slate-500">{{ getDateStatus(employee.startDate, employee.endDate, false) }}</p>
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
                type="button"
                @click="isModalOpen = true">
                <i class="pi pi-trash" style="font-size: 1rem"></i>    
            </button>
            <DeleteEmployee :visible="isModalOpen" @close="isModalOpen = false" />
        </td>
    </tr>
</template>