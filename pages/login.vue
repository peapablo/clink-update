<template>
    <div class="bg-default">
      <div class="header py-7 py-lg-8 pt-lg-9">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                <h1 class="text-white">Welcome to C-Link</h1>
                <p class="text-lead text-white">
                  A laboratory information management system.
                </p>
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
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-header bg-transparent pb-3 text-center">
                <img src="/static/img/logo/logo-clink.png" style="width: 140px" />
              </div>
              <div class="card-body px-lg-5 py-lg-1">
                <div class="text-center text-muted mb-4">
                  <h3>โปรดระบุผู้ใช้งาน / Login Account</h3>
                </div>
                <form @submit.prevent="onSubmit">
                  <base-input class="mb-3" prepend-icon="ni ni-email-83" placeholder="Login name" v-model="loginname" />
                  <base-input class="mb-3" prepend-icon="ni ni-lock-circle-open" type="password" placeholder="Password" v-model="password" />
                  <base-checkbox class="mt-3" v-model="rememberMe">Remember me</base-checkbox>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4" :disabled="isSubmitting">
                      {{ isSubmitting ? "Logging In..." : "Login" }}
                    </base-button>
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
  import { ref, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMainStore } from '@/store';
  import { ofetch } from 'ofetch';
  import swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.css';
  
  const router = useRouter();
  const store = useMainStore();
  const loginname = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  const isSubmitting = ref(false);
  
  watch(() => store.accessToken, (val) => {
    if (val) {
      router.push('/dashboard');
      swal.fire({
        iconHtml: '<i class="fas fa-user-circle" style="font-size: 80px"></i>',
        title: 'ยินดีต้อนรับ',
        html: `<h3 class="text-center">${store.profile?.firstname} ${store.profile?.lastname} เลข ท.น. ${store.profile?.med_user_code}<br />ตำแหน่ง ${store.profile?.position}</h3>`,
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        timer: 3000,
      });
    }
  });
  
  const onSubmit = async () => {
    if (!loginname.value || !password.value) return;
    isSubmitting.value = true;
    const url = `${store.urlBase}/oauth/token`;
    const bodyFormData = new FormData();
    bodyFormData.append('grant_type', 'password');
    bodyFormData.append('scope', '*');
    bodyFormData.append('client_id', import.meta.env.VITE_AUTH_CLIENT_ID);
    bodyFormData.append('client_secret', import.meta.env.VITE_AUTH_CLIENT_SECRET);
    bodyFormData.append('username', loginname.value);
    bodyFormData.append('password', password.value);
    try {
      const response = await ofetch(url, { method: 'POST', body: bodyFormData });
      const { access_token: accessToken } = response;
      const profileResponse = await ofetch(`${store.urlBase}/api/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = profileResponse.data ?? {};
      delete profile['permissions'];
      store.setProfile(profile);
      store.setAccessToken(accessToken);
      rememberMe.value ? store.removeExpired() : store.setExpired(new Date().getTime() + 86400000);
      isSubmitting.value = false;
    } catch (err) {
      swal.fire({
        icon: 'error',
        title: 'ลงชื่อเข้าใช้งานไม่สำเร็จ',
        confirmButtonText: 'ตกลง',
      }).then(() => {
        isSubmitting.value = false;
      });
    }
  };
  
  onMounted(() => {
    store.initializeStore();
  });
  </script>
  
  <style scoped>
  .login-swal2-icon {
    border-color: transparent !important;
  }
  .swal2-actions-center {
    justify-content: center !important;
  }
  </style>
  