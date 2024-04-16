import { config } from "~/utils/surrealdb";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  const res: any = await $fetch(`${config.url}/key/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      NS: config.namespace,
      DB: config.database,
      Accept: "application/json",
    },
  });
  return res[0].result[0];
});
