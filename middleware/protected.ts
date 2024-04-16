export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth_store = useAuth();
  if (!auth_store.is_authenticated.value) {
    return navigateTo("/signin");
  }
});
