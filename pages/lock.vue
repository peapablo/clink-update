<template>
    <div>
      <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                <h1 class="text-white">Lock screen</h1>
                <p class="text-lead text-white">Better to be safe than sorry.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card card-profile bg-secondary mt-5">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <img src="/img/theme/team-4.jpg" class="rounded-circle border-secondary">
                  </div>
                </div>
              </div>
              <div class="card-body pt-7 px-5">
                <div class="text-center mb-4">
                  <h3>Jessica Jones</h3>
                </div>
                <form @submit.prevent="unlock">
                  <base-input alternative prepend-icon="ni ni-lock-circle-open" type="password" placeholder="Password" v-model="password" />
                  <div class="text-center">
                    <base-button type="primary" class="mt-2">Unlock</base-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const password = ref('');
  
  const unlock = () => {
    console.log('Unlocking...');
  };
  
  definePageMeta({
    layout: 'AuthLayout'
  });
  </script>
  
  <style scoped></style>
  