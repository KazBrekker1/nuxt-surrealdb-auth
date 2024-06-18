import clientPromise from "~/server/surrealdb";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event); // name, email, password
  const db = await clientPromise;
  let users = await db.select("user");
  if (users.find((u) => u.email === formData.get("email"))) {
    throw createError({
      statusCode: 400,
      statusMessage: "User with this email already exists",
    });
  }
  const name = formData.get("name") as string;
  const image = `https://ui-avatars.com/api/?name=${name}`;
  const query_result = (await db.query(
    "CREATE user CONTENT { name: $name, email: $email, image: $image, password: crypto::argon2::generate($password) }",
    {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image,
    }
  )) as any;

  const registered = query_result[0].length === 1;
  if (!registered) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to register user",
    });
  }

  return query_result[0][0];
});
