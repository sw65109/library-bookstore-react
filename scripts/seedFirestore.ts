import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { books } from '../src/data.js'; // adjust path if needed

initializeApp({
  credential: applicationDefault(), // uses your local gcloud credentials
});

const db = getFirestore();

const seedBooks = async () => {
  const batch = db.batch();
  const booksRef = db.collection('books');

  books.forEach((book) => {
    const docRef = booksRef.doc(book.id.toString()); 
    batch.set(docRef, book);
  });

  await batch.commit();
  console.log('✅ Firestore seeded with books!');
};

seedBooks()
.then(() => process.exit(0))
.catch((err) => {
  console.error(" Failed to seed Firestore:", err);
  process.exit(1);
});

seedBooks().catch(console.error);



