<template>
  <div class="flex flex-col">
    <UCard class="min-w-[30rem]">
      <template #header>
        <h1>Profile</h1>
      </template>
      <p>User id: {{ auth.user.value?.id }}</p>
      <p>Username: {{ auth.user.value?.name }}</p>
      <p>Email: {{ auth.user.value?.email }}</p>
      <template #footer>
        <div class="flex flex-col gap-1">
          <UButton
            style="view-transition-name: auth-card-submit"
            @click="handleLogout"
            label="Logout"
            color="red"
            :loading="loading"
            block
          />
          <div class="flex gap-1 justify-end">
            <UButton @click="request_smth" label="Request" />
            <Reset v-if="auth.user.value?.password" />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["protected"],
});

const loading = ref(false);
const request_loading = ref(false);

const auth = useAuth();
const toast = useToast();

const handleLogout = async () => {
  loading.value = true;
  try {
    await auth.logout();
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to logout [how?]",
      timeout: 5000,
    });
  } finally {
    loading.value = false;
  }
};

const request_smth = async () => {
  try {
    request_loading.value = true;
    const res = await $fetch("/api/me", {
      method: "GET",
    });
    toast.add({
      title: "From server",
      description: res,
      timeout: 5000,
    });
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to request",
      timeout: 5000,
    });
  } finally {
    request_loading.value = false;
  }
};
</script>

<style></style>
