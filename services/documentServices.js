import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";

import { db, COLLECTIONS } from "../database";

export const getAvailableSubjects = async () => {
  const collRef = collection(db, COLLECTIONS.DOCUMENTS);
  const docSnap = await getDocs(collRef);

  return docSnap.docs.map(doc => doc.id);
};
