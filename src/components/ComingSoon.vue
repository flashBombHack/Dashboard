<template>
    <dashboard-layout>
        <div class="container-fluid">

<!-- 404 Error Text -->
<div class="text d-flex flex-column align-items-center">
    <div class="error" data-text="404">404</div>
    <p class="lead text-gray-800 mb-5">This Item is still under construction</p>
    <p class="text-gray-500 mb-0">Coming Soon!!</p>
    <router-link to="/dashboard" class="mt-3">&larr; Back to Dashboard</router-link>
</div>


</div>
    </dashboard-layout>
  </template>
  
  <script>
  import DashboardLayout from './DashboardLayout.vue';
  
  export default {
    name: 'Coming-soon-page',
  
    components: {
      DashboardLayout,
  
    },
  }
  </script>
  
  <style>
  </style>
  