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
      <UButton
        :loading="loading"
        label="Sign up"
        type="submit"
        block
        color="blue"
      />
    </form>
    <template #footer>
      <p class="text-sm">
        Have an account?
        <NuxtLink class="text-blue-600" to="/signin">sign in</NuxtLink>
      </p>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const loading = ref(false);
const { signIn } = useAuth();

const handleSubmit = async (event: Event) => {
  if (!(event.target instanceof HTMLFormElement)) return;
  const formData = new FormData(event.target);
  loading.value = true;
  const toast = useToast();
  try {
    await $fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl: "/",
    });
  } catch (error: any) {
    toast.add({
      color: "red",
      title: "Error",
      description:
        error?.statusMessage || error?.message || "An error occurred",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
