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

- Google Authentication through NuxtAuth
- Email and Password Authentication is enabled by default in SurrealDB

### Interaction with sureraldb from server side

- Find the `server/api/me.get.ts` file to see how to query the data from SurrealDB on the server side. In this file, we are querying the user data from SurrealDB.

### Environment Variables

- Open `.env.example` file and rename it to `.env`
- Replace The values in `.env` file with your own values
  - To set up the Google Client ID and Client Secret, please refer to the [Google OAuth documentation](https://support.google.com/cloud/answer/6158849?hl=en)

## Project Setup

### Run Database

```bash
surreal start --user {user} --pass {password} --log debug --bind 127.0.0.1:{PORT} --auth file://{file_name}
```

- Replace `{user}` with your SurrealDB username
- Replace `{password}` with your SurrealDB password
- Replace `{file_name}` with your SurrealDB auth file
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
