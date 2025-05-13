<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import EmployeesTable from '@/components/EmployeesTable.vue';
</script>

<template>
    <Hero 
      title="Welcome to Purple Cross" 
      subtitle="Add a new starter, remove employees and many more"
      />
    
    <div class="container-xl lg:container m-auto">
      <HomeCards />
      <EmployeesTable :limit="4" :showPagination="true" />
    </div>
</template>