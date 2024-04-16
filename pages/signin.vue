<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Sign in</h1>
    </template>

    <form
      method="post"
      action="/api/login"
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-4"
    >
      <UInput type="email" name="email" id="email" placeholder="Email" />
      <UInput
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <UButton
        style="view-transition-name: auth-card-submit"
        type="submit"
        label="Submit"
        :loading="loading"
        block
      />
      <UAlert
        v-if="errorMessage"
        variant="subtle"
        color="red"
        title="Error"
        :description="errorMessage"
      />
    </form>

    <template #footer>
      <NuxtLink class="text-sm text-gray-500" to="/signup">
        Create an account
      </NuxtLink>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const loading = ref(false);
const errorMessage = ref("");

const auth = useAuth();
const toast = useToast();

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    loading.value = true;
    await auth.login(email, password);
    errorMessage.value = "";
    await navigateTo("/");
  } catch (error) {
    toast.add({
      color: "red",
      title: "Error",
      description: "Invalid email or password",
      timeout: 5000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
