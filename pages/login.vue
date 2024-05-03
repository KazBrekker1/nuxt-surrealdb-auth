<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Sign in</h1>
    </template>
    <UButton
      label="Sign in with Google"
      block
      color="orange"
      @click="signIn('google')"
    >
      <template #leading>
        <Icon name="mdi:google" />
      </template>
    </UButton>
  </UCard>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
const { signIn } = useAuth();
</script>
