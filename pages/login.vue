<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Sign In</h1>
    </template>
    <section class="flex flex-col gap-2">
      <UInput
        v-model="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      <UInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <UButton label="Sign in" block color="blue" @click="handleSignIn" />
      <hr />
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
    </section>
    <template #footer>
      <p class="text-sm">
        Don't have an account?
        <NuxtLink class="text-blue-600" to="/register">sign up</NuxtLink>
      </p>
    </template>
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
const email = ref("");
const password = ref("");
const toast = useToast();
const handleSignIn = async () => {
  const resp: any = await signIn("credentials", {
    email: email.value,
    password: password.value,
    redirect: false,
  });
  if (resp.error) {
    toast.add({
      color: "red",
      title: "Error",
      description: resp.error,
    });
  } else {
    await navigateTo(resp.url, { external: true });
  }
};

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const { callbackUrl, error } = route.query;
  if (error) {
    let message =
      error == "OAuthAccountNotLinked"
        ? "Email not linked with google"
        : (error as string);
    toast.add({
      color: "red",
      title: "Error",
      description: message,
    });
    await router.push({
      query: {},
      replace: true,
    });
  }
});
</script>
