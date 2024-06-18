FROM surrealdb/surrealdb:latest
EXPOSE 8080
CMD ["start", "memory", "--bind", "0.0.0.0:8080", "--user", "nuxt-auth", "--pass", "nuxt-auth-password"]