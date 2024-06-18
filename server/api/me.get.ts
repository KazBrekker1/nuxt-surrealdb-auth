import clientPromise from "../surrealdb";
import { getToken } from "#auth";

export default defineEventHandler(async (event) => {
  const db = await clientPromise;
  let users = await db.select("user");
  const token = await getToken({ event });
  let user = users.find((u) => u.email === token?.email) as Record<string, any>;
  delete user.password; // don't return password
  return user;
});
