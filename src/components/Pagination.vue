<script setup>
import { defineProps } from 'vue';

defineProps({
    start: Number,
    end: Number,
    totalResults: Number,
    pages: Number,
    page: Number,
})
</script>
<template>
    <div class="flex justify-between items-center px-4 py-3">
        <div class="text-sm text-slate-500">
            Showing <b>{{ start }}-{{ end}}</b> of {{ totalResults }}
        </div>
        <div class="flex space-x-1">
            <button
                :disabled="page < 2"
                :class="{ 'opacity-25 cursor-not-allowed': page < 2 }"
                @click="$emit('page-clicked', page-1)"
                class="cursor-pointer px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
            </button>

            <button
                v-for="n in pages" :key="n"
                @click="$emit('page-clicked', n)"
                :class="`${page === n ? 'text-white bg-green-800 hover:bg-green-50 hover:text-green-800 border border-green-800' : 'text-slate-500 bg-white hover:bg-slate-50 hover:border-slate-400 border border-slate-200'}`"
                class="cursor-pointer px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded transition duration-200 ease">
                {{ n }}
            </button>
            <button
                :disabled="page > pages - 1"
                :class="{ 'opacity-25 cursor-not-allowed': page > pages -1 }"
                @click="$emit('page-clicked', page+1)"
                class="cursor-pointer px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Next
            </button>
        </div>
    </div>
</template>