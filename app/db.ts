/*
 * Database setup
 * Author: Seth Culberson
 * Email: sethculb@bu.edu
 * 
 * Sets up and exports the RxDB database instance for local storage.
 */

import { createRxDatabase } from 'rxdb';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';

// Instance of the database; if it is already created, then we can return it in getDatabase
let dbPromise : Promise<any> | null = null

async function setUpRxDB() {
  
  const db = await createRxDatabase({
    name: 'finances',
    storage: getRxStorageLocalstorage(),
    multiInstance: false
  }).catch((err) => {
    console.error("Failed to create RxDB database:", err);
    throw err;
  });

  // Define the finance schema
  const financeSchema = {
    title: 'finances',
    version: 0,
    type: 'object',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', maxLength: 25 },
      month: { type: 'integer' },
      year: { type: 'integer' },
      wants: { type: 'decimal' },
      needs: { type: 'decimal' },
      savings: { type: 'decimal' },
      total: { type: 'decimal' }
    },
    required: ['id', 'month', 'year', 'wants', 'needs', 'savings', 'total']
  };

  // Add finances collection
  await db.addCollections({ finances: { schema: financeSchema } })
    .catch((err) => {
      console.error("Failed to add collections to RxDB database:", err);
      throw err;
    });
  
  // Query docs once
  const allFinances = await db.finances.find().exec()
    .catch((err) => {
      console.error("Failed to query finances collection:", err);
      throw err;
    });

  return db;
};

// Function to get the database instance. Call this in your components to access user data.
// See the page.tsx file in the history folder to see how to access the database.
export async function getDatabase() {
  if (!dbPromise) {
    dbPromise = setUpRxDB();
  }
  return dbPromise;
}