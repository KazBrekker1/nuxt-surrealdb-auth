<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Sign Up</h1>
    </template>
    <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
      <UInput
        label="Name"
        name="name"
        type="text"
        placeholder="Enter your name"
        required
      />
      <UInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <UInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <UButton label="Sign up" type="submit" block color="blue" />
    </form>
    <template #footer>
      <p class="text-sm">
        Have an account?
        <NuxtLink class="text-blue-600" to="/login">sign in</NuxtLink>
      </p>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
const name = ref("");
const email = ref("");
const password = ref("");
const handleSubmit = async (event: Event) => {
  if (!(event.target instanceof HTMLFormElement)) return;
  const formData = new FormData(event.target);
  const response = await $fetch("/api/auth/signup", {
    method: "POST",
    body: formData,
  });
};
</script>

<style></style>
