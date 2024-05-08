<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Sign In</h1>
    </template>
    <form class="flex flex-col gap-2" @submit.prevent="handleSignIn">
      <UInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
      />
      <UInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
      />
      <UButton
        :loading="loading"
        label="Sign in"
        block
        color="blue"
        type="submit"
      />
      <hr />
      <UButton
        :loading="loading"
        label="Sign in with Google"
        block
        color="orange"
        @click="signIn('google')"
      >
        <template #leading>
          <Icon name="mdi:google" />
        </template>
      </UButton>
    </form>
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

const loading = ref(false);
const toast = useToast();
const { signIn } = useAuth();

const handleSignIn = async (event: Event) => {
  if (!(event.target instanceof HTMLFormElement)) return;
  const formData = new FormData(event.target);
  loading.value = true;
  try {
    const resp: any = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
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
  } catch (error) {
    toast.add({
      color: "red",
      title: "Error",
      description: "An error occurred",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const { error } = route.query;
  if (!error) return;
  if (error == "undefined") return;

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
});
</script>
