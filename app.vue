<script lang="ts" setup>
let mode = useColorMode();
let is_dark = computed(() => mode.value === "dark");
const toggleColorMode = () => {
  const mode = useColorMode();
  mode.preference = mode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <NuxtLayout>
    <UContainer>
      <NuxtPage />
      <ClientOnly>
        <UButton
          class="fixed bottom-4 right-4"
          @click="toggleColorMode"
          :variant="is_dark ? 'soft' : 'solid'"
          :icon="is_dark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          :label="is_dark ? 'Light' : 'Dark'"
          :color="is_dark ? 'cyan' : 'black'"
        />
      </ClientOnly>
    </UContainer>
    <UNotifications />
  </NuxtLayout>
</template>
