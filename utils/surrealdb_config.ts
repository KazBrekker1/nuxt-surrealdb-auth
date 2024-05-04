export const config = {
  url: import.meta.env.VITE_SURREALDB_URL!,
  namespace: import.meta.env.VITE_SURREALDB_NS!,
  database: import.meta.env.VITE_SURREALDB_DB!,
  username: import.meta.env.VITE_SURREALDB_USER!,
  password: import.meta.env.VITE_SURREALDB_PASS!,
};
