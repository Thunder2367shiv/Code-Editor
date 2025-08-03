// config/firebase.js
import admin from 'firebase-admin';
 
import { readFile } from 'fs/promises';

// Load service account credentials from JSON file
const serviceAccount = JSON.parse(
  await readFile(new URL('../firebase-service-account.json', import.meta.url))
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyFirebaseToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase token:', error.message);
    throw new Error('Invalid Firebase token');
  }
};

export { admin, verifyFirebaseToken };
