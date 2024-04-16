export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth_store = useAuth();
  if (!auth_store.is_authenticated.value) {
    if (to.path !== "/auth") {
      return navigateTo("/auth");
    }
  } else if (to.path === "/auth") {
    return navigateTo("/");
  }
});
