import { getToken } from "#auth";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event, raw: true });
  return token || "no token present";
});
