import { Surreal } from "surrealdb.js";

const connectionString = process.env.NEXT_PUBLIC_DB_CONNECTION_URL as string;
const username = process.env.NEXT_PUBLIC_DB_USER as string;
const password = process.env.NEXT_PUBLIC_DB_PASSWORD as string;
const namespace = process.env.NEXT_PUBLIC_NAMESPACE as string;
const database = process.env.NEXT_PUBLIC_DB_NAME as string;

export const surrealDatabase = new Surreal();

export const surrealConnection = () =>
  new Promise<Surreal>(async (resolve, reject) => {
    try {
      await surrealDatabase.connect(`${connectionString}/rpc`, {
        namespace,
        database,
        auth: { username, password },
      });
      resolve(surrealDatabase);
    } catch (e) {
      console.log("here1");
      console.log({ e });
      reject(e);
    }
  });
