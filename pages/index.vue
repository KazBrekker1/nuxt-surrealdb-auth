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
      <div class="flex gap-2 justify-between">
        <UButton @click="getUser" color="blue" variant="soft">Get User</UButton>
        <UButton @click="handleSignOut" :loading color="red">Sign Out</UButton>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const toast = useToast();
const loading = ref(false);
const { data, signOut } = useAuth();

const handleSignOut = async () => {
  loading.value = true;
  try {
    await signOut({
      callbackUrl: "/signin",
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const getUser = async () => {
  try {
    const resp = await $fetch("/api/me");
    return toast.add({
      color: "blue",
      title: "User data",
      description: JSON.stringify(resp, null, 2),
    });
  } catch (error) {
    console.log(error);
    return toast.add({
      color: "red",
      title: "Error",
      description: "Failed to fetch user data",
    });
  }
};

// // Example of getting a JWT token
// const headers = useRequestHeaders(["cookie"]) as HeadersInit;
// const { data: token } = await useFetch("/api/token", { headers });
</script>
