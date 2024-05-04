import clientPromise from "~/server/surrealdb";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event); // name, email, password
  const db = await clientPromise;
  let users = await db.select("user");
  if (users.find((u) => u.email === formData.get("email"))) {
    return new Response("Email already exists", { status: 400 });
  }
  const query_result = await db.query(
    "CREATE user CONTENT { name: $name, email: $email, password: crypto::argon2::generate($password) }",
    {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    }
  );

  return query_result[0] === 1
    ? new Response("User created")
    : new Response("Failed to create user", { status: 500 });
});
