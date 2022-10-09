import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.NEXT_PUBLIC_DB_URI!, {
  serverApi: ServerApiVersion.v1,
});

client.connect();
