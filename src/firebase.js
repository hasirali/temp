import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUIZWFfiF7sxnvPuaV-Iqndf_MMb1P2T4",
  authDomain: "fb-clone-4cc13.firebaseapp.com",
  projectId: "fb-clone-4cc13",
  storageBucket: "fb-clone-4cc13.appspot.com",
  messagingSenderId: "733191273872",
  appId: "1:733191273872:web:ed0729feecde49b8a50715",
  measurementId: "G-QBYSHR77C7"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


export const updateLikeCount = async (postId, newCount) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { likes: newCount });
};

export { auth, provider, db};
export default db;