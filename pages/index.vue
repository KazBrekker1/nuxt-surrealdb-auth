<template>
  <div class="flex flex-col">
    {{ auth.user.value?.name }}
    {{ auth.user.value?.id }}
    <UButton @click="auth.logout" color="red" label="Logout" />
    <UButton @click="request_smth" label="Request" />
    <form @submit.prevent="handleReset">
      <h1>Reset Password</h1>
      <UInput v-model="current_password" label="Current Password" />
      <UInput v-model="new_password" label="New Password" />
      <UButton type="submit" label="Submit" />
    </form>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth();

const current_password = ref("");
const new_password = ref("");

const request_smth = async () => {
  const res = await $fetch("/api/me", {
    method: "GET",
  });
  console.log(res);
};

const handleReset = async () => {
  await auth.resetPassword(
    current_password.value,
    new_password.value,
    auth.user.value?.email!
  );
};
</script>

<style></style>
