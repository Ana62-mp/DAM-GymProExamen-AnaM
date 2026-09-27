
import * as SQLite from "expo-sqlite";
import type { Routine } from "../context/RoutineContext";


// Guardamos la conexión a la base de datos
let database: SQLite.SQLiteDatabase | null = null;

// Obtener la base de datos
export async function getDatabase() {

  if (!database) {
    database = await SQLite.openDatabaseAsync("gymPro.db");
  }

  return database;
}

// Crear la tabla de rutinas
export async function initDatabase() {

  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS routines (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      muscleGroup TEXT NOT NULL,
      duration INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0
    );
  `);

  return db;
}


//FUNCIONES PARA EL CRUD

// GET TODAS LAS RUTINAS
export async function getAllRoutines() {
  const db = await getDatabase();

  const routines = await db.getAllAsync<Routine>(
    `SELECT id, name, muscleGroup, duration, createdAt
     FROM routines
     ORDER BY createdAt ASC`
  );

  return routines;
}


// POST UNA RUTINA
export async function insertRoutine(routine: Routine) {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT INTO routines
     (id, name, muscleGroup, duration, createdAt)
     VALUES (?, ?, ?, ?, ?)`,
    routine.id,
    routine.name,
    routine.muscleGroup,
    routine.duration,
    routine.createdAt
  );
}


// UPDATE UNA RUTINA
export async function updateRoutineDB(routine: Routine) {
  const db = await getDatabase();

  await db.runAsync(
    `UPDATE routines
     SET name = ?, muscleGroup = ?, duration = ?
     WHERE id = ?`,
    routine.name,
    routine.muscleGroup,
    routine.duration,
    routine.id
  );
}


// DELKETE UNA RUTINA
export async function deleteRoutineDB(id: string) {
  const db = await getDatabase();

  await db.runAsync(
    `DELETE FROM routines WHERE id = ?`,
    id
  );
}
