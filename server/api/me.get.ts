export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  const res: any = await $fetch("http://localhost:8080/key/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      NS: "auth-test",
      DB: "auth-test",
      Accept: "application/json",
    },
  });
  return res[0].result[0];
});
