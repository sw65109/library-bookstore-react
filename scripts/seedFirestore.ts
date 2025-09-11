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
    const docRef = booksRef.doc(book.id.toString()); // use ID as doc name
    batch.set(docRef, book);
  });

  await batch.commit();
  console.log('✅ Firestore seeded with books!');
};

seedBooks().catch(console.error);



