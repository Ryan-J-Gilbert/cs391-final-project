import { createRxDatabase } from 'rxdb';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';

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

export async function getDatabase() {
  if (!dbPromise) {
    dbPromise = setUpRxDB();
  }
  return dbPromise;
}