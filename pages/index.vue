<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  router.push('/dashboard');
});
</script>

<template>
  <div>
    <h1>Redirecting...</h1>
  </div>
</template>
