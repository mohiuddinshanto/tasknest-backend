import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import process from 'process';

let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI missing in .env file');

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db('tasknest_db');
  console.log('MongoDB Connected Successfully!');
  return db;
}