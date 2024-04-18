# Nuxt3 Starter Template

## Features

- SurrealDB
  - Password and Google Auth
- Nuxt UI
- TailwindCSS
- Prettier
- Bun (just for fun)

## Requirements

- [Bun](https://bun.sh/)
- [SurrealDB](https://surrealdb.com/)
- [Node v20 or higher](https://nodejs.org/en/)
- [Coffee](https://en.wikipedia.org/wiki/Coffee)

## Instructions

### Authentication

- Email and Password Authentication is enabled by default in SurrealDB
- Google Authentication is enabled through Firebase

### Interaction with sureraldb from server side

- Find the `server/api/me.get.ts` file to see how to query the data from SurrealDB on the server side. In this file, we are querying the user data from SurrealDB.

### Environment Variables

- Open `.env.example` file and rename it to `.env`
- Replace The `VITE_SURREALDB_URL` variable to your SurrealDB URL
- Replace The `VITE_SURREALDB_NS` variable to your SurrealDB Namespace
- Replace The `VITE_SURREALDB_DB` variable to your SurrealDB Database Name
- Open the `utils/firebase.ts` file and replace the `firebaseConfig` object with your Firebase Config

## Project Setup

### Run Database

```bash
surreal start --user {user} --pass {password} --log debug --bind 127.0.0.1:{PORT} --auth file://{file_name}
```

- Replace `{user}` with your SurrealDB username
- Replace `{password}` with your SurrealDB password
- Replace `{file_name}` with your SurrealDB auth file
- Replace `{PORT}` with your desired port number

### Push schema to DB

```bash
surreal import --user {user} --pass {password} --namespace {db_namespace} --database {db_database}  base_db.surql --conn http://localhost:{PORT}
```

- Replace `{user}` with your SurrealDB username
- Replace `{password}` with your SurrealDB password
- Replace `{db_namespace}` with your SurrealDB namespace from `.env` file
- Replace `{db_database}` with your SurrealDB database name from `.env` file
- Replace `{PORT}` with your desired port number

### Install Dependencies

```bash
bun install
```

### Run Development Server

```bash
bun dev
```

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```
