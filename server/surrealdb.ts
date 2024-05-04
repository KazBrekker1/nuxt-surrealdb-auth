import { Surreal } from "surrealdb.js";
import { config } from "~/utils/surrealdb_config";

const clientPromise = new Promise<Surreal>(async (resolve, reject) => {
  const db = new Surreal();
  try {
    await db.connect(`${config.url}/rpc`, {
      namespace: config.namespace,
      database: config.database,
      auth: {
        username: config.username,
        password: config.password,
      },
    });
    resolve(db);
  } catch (e) {
    reject(e);
  }
});

export default clientPromise;
