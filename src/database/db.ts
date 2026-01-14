import * as SQLite from 'expo-sqlite';

// Open the database (creates it if it doesn't exist)
const db = SQLite.openDatabaseSync('uma_ai.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        full_name TEXT NOT NULL,
        farm_name TEXT,
        region TEXT
      );

      CREATE TABLE IF NOT EXISTS scans (
        id TEXT PRIMARY KEY NOT NULL,
        crop_type TEXT NOT NULL,
        image_uri TEXT NOT NULL,
        disease_detected TEXT,
        confidence REAL,
        timestamp INTEGER NOT NULL,
        cloud_synced INTEGER DEFAULT 0
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

export default db;
