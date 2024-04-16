<template>
  <div>
    <UButton
      label="Reset Password"
      variant="soft"
      class="ring-1"
      color="blue"
      @click="is_open = true"
    />
    <UModal v-model="is_open">
      <form @submit.prevent="handleReset" class="p-4 space-y-2">
        <h1>Reset Password</h1>
        <UInput v-model="current_password" label="Current Password" />
        <UInput v-model="new_password" label="New Password" />
        <UButton type="submit" label="Submit" />
      </form>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const is_open = ref(false);

const auth = useAuth();
const toast = useToast();

const new_password = ref("");
const current_password = ref("");
const handleReset = async () => {
  try {
    await auth.resetPassword(
      current_password.value,
      new_password.value,
      auth.user.value?.email!
    );
  } catch (error) {
    toast.add({
      color: "red",
      title: "Error",
      description: "Failed to reset password. Please try again.",
      timeout: 5000,
    });
  }
};
</script>

<style></style>
