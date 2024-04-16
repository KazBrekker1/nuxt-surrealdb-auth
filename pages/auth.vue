<script setup lang="ts">
const auth = useAuth();
const name = ref("Kazbrekker1");
const password = ref("egyboy777");
const email = ref("youssef@kanari.ai");
const signup = async () => {
  await auth.register(name.value, email.value, password.value);
};
const signin = async () => {
  await auth.login(email.value, password.value);
};
</script>
<template>
  <section class="flex flex-col gap-4">
    <form
      method="POST"
      @submit.prevent="signup"
      v-if="!auth.is_authenticated.value"
    >
      <UInput type="text" v-model="name" />
      <UInput type="email" v-model="email" />
      <UInput type="password" v-model="password" />
      <UButton type="submit" label="Signup" />
    </form>
    <form
      method="POST"
      @submit.prevent="signin"
      v-if="!auth.is_authenticated.value"
    >
      <UInput type="email" v-model="email" />
      <UInput type="password" v-model="password" />
      <UButton type="submit" label="Login" />
    </form>
  </section>
</template>
