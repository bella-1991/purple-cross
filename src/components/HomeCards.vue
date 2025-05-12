<script setup>
    import Card from '@/components/Card.vue';
</script>

<template>
    <section class="py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">Add Employee</h2>
          <p class="mt-2 mb-4">
            Add new a new starter
          </p>
          <a
            href="jobs.html"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            Add
          </a>
        </Card>
        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">Terminate Employee</h2>
          <p class="mt-2 mb-4">
            Manage employee terminations
          </p>
          <a
            href="add-job.html"
            class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Terminate
          </a>
        </Card>
      </div>
    </section>
</template>