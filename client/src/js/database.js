import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Adding content to database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = await store.put({ id: 1, value: content });
  const result = await request;
  console.log('Content added to database:', result);
};

export const getDb = async () => {
  console.log('Getting content from database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = await store.get(1);
  const result = await request;
  await tx.complete;
  console.log('Result.value', result?.value);
  return result?.value;
};

initdb();
