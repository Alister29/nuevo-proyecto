import { addDoc, query, where, collection, getDocs } from "firebase/firestore";

import { db, COLLECTIONS } from "../database";

export const getAvailableSubjects = async () => {
  const collRef = collection(db, COLLECTIONS.DOCUMENTS);
  const docSnap = await getDocs(collRef);

  return docSnap.docs.map((doc) => doc.id);
};

export const uploadDocuments = async (documents) => {
  try {
    const docRef = collection(db, COLLECTIONS.DOCUMENTS);
    await addDoc(docRef, documents);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchDocuments = async (materia, categoria = "") => {
  try {
    const collRef = collection(db, COLLECTIONS.DOCUMENTS);
    const filters = [
      where("aprobado", "==", true),
      where("materia", "==", materia),
    ];

    if (categoria && categoria.trim() && categoria !== "none") {
      filters.push(where("categoria", "==", categoria));
    }

    const q = query(collRef, ...filters);

    const snap = await getDocs(q);

    if (snap.empty) return [];

    return snap.docs.map((d) => d.data());
  } catch (error) {
    throw new Error(error.message);
  }
};
