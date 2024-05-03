<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Profile</h1>
    </template>
    <p>Username: {{ data?.user?.name }}</p>
    <p>Email: {{ data?.user?.email }}</p>
    <template #footer>
      <UButton @click="handleSignOut" color="red">Sign Out</UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const { data, signOut } = useAuth();
const handleSignOut = async () => {
  await signOut({
    callbackUrl: "/login",
  });
};
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });
</script>
