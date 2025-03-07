<template>
    <div>
      <client-only>
        <big-calendar></big-calendar>
      </client-only>
    </div>
  </template>
  
  <script setup>
  import { defineComponent } from 'vue';
  import { useLayout } from '#app';
  
  useLayout('DashboardLayout');
  </script>