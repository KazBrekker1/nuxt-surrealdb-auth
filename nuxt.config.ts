// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    public: {
      surrealdbUrl: process.env.NUXT_PUBLIC_SURREALDB_URL,
      surrealdbNamespace: process.env.NUXT_PUBLIC_SURREALDB_NS,
      surrealdbName: process.env.NUXT_PUBLIC_SURREALDB_DB,
    },
  },
});
