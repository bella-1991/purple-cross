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
      <HomeCards 
        title1="Leave Requests"
        subtitle1="Manage employee leave requests"
        link1Path="/leaves"
        link1Text="Leaves"
        title2="Attendence"
        subtitle2="Manage office attendece"
        link2Path="/attendence"
        link2Text="Attendence"
        />
      <EmployeesTable :limit="4" :showPagination="true" />
      <HomeCards
        title1="Terminate Employee"
        subtitle1="Manage employee terminations"
        link1Path="/employees"
        link1Text="Terminate"
        title2="Add Employee"
        subtitle2="Add new a new starter"
        link2Path="/employees/add"
        link2Text="Add"
       />
    </div>
</template>