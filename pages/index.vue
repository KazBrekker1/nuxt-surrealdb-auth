<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Profile</h1>
    </template>
    <section class="flex flex-col items-center gap-2">
      <img
        class="rounded-full size-20"
        v-if="data?.user?.image"
        :src="data?.user?.image"
        alt="Profile pic"
      />
      <p>Name: {{ data?.user?.name }}</p>
      <p>Email: {{ data?.user?.email }}</p>
    </section>
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

// // Example of getting a JWT token
// const headers = useRequestHeaders(["cookie"]) as HeadersInit;
// const { data: token } = await useFetch("/api/token", { headers });
</script>
