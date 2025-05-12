<script setup>
  import Navbar from '@/components/Navbar.vue';
  import Hero from '@/components/Hero.vue';
  import HomeCards from '@/components/HomeCards.vue';
  import EmployeesTable from './components/EmployeesTable.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar />
  <Hero 
    title="Welcome to Purple Cross" 
    subtitle="Add a new starter, remove employees and many more"
    />
  
  <div class="container-xl lg:container m-auto">
    <HomeCards />
    <EmployeesTable :limit="4" :showPagination="true" />
  </div>
  <Footer />

</template>

