import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseAsync("shoppinglistsapp");

export default async function Database() {
    (await db).execSync(`
       PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS shoplistapp (
              id INTEGER PRIMARY KEY NOT NULL, 
              _id TEXT NOT NULL,
              name TEXT NOT NULL, 
              quantity TEXT NOT NULL,
              emoji TEXT NOT NULL,
              isCompleted INTEGER NOT NULL DEFAULT 0,
              updatedAt TEXT NOT NULL
       );
    `);
};