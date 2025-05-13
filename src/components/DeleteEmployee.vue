
<script setup>
defineProps(['visible'])
defineEmits(['close'])
</script>

<template>
    <div v-if="visible" class="fixed inset-0 bg-slate-500/50 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded p-6 w-80 shadow-lg text-center relative">
      <h2 class="text-lg font-semibold mb-4">
        Are you sure?
        <button @click="$emit('cancel')" class="p-4 absolute top-0 right-0 cursor-pointer">
          <i class="pi pi-times"></i>
        </button>
      </h2>
      <p class="mb-6">This action cannot be undone.</p>
      <div class="flex justify-center gap-4">
        <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400  cursor-pointer">
          Cancel
        </button>
        <button @click="$emit('confirm')" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>