// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $pinia } = useNuxtApp();
  const store = $pinia.store;  

  // ตรวจสอบ token
  if (!store.state.accessToken) {
    return navigateTo('/login'); 
  }
});
