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

      CREATE TABLE IF NOT EXISTS treatments (
        id TEXT PRIMARY KEY NOT NULL,
        scan_id TEXT NOT NULL,
        treatment_name TEXT NOT NULL,
        treatment_type TEXT NOT NULL,
        cost REAL,
        notes TEXT,
        timestamp INTEGER NOT NULL,
        FOREIGN KEY(scan_id) REFERENCES scans(id)
      );

      CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date INTEGER NOT NULL,
        note TEXT,
        synced INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS harvests (
        id TEXT PRIMARY KEY NOT NULL,
        crop_type TEXT NOT NULL,
        weight_kg REAL NOT NULL,
        price_per_kg REAL,
        date INTEGER NOT NULL,
        synced INTEGER DEFAULT 0
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

export default db;
