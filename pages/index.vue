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
            @click="auth.logout"
            label="Logout"
            color="red"
            block
          />
          <div class="flex gap-1 justify-end">
            <UButton @click="request_smth" label="Request" />
            <Reset />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const auth = useAuth();
const toast = useToast();
const request_smth = async () => {
  const res = await $fetch("/api/me", {
    method: "GET",
  });
  toast.add({
    title: "From server",
    description: res,
    timeout: 5000,
  });
  console.log(res);
};
</script>

<style></style>
