import { COLLECTIONS, db } from "../database";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const subirPensum = async (carrera, pensum) => {
  try {
    await setDoc(doc(db, "pensums", carrera), pensum);
    return `Se subio el pensum para ${carrera}`;
  } catch (error) {
    return `Ocurrio un error al subir el pensum para ${carrera}`;
  }
};

export const leerPensum = async (carrera) => {
  const docRef = doc(db, "pensums", carrera);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("❌ no existe el pensum");
    return {};
  }
};

export const saveProgress = async (user, progress) => {
  try {
    if (!user) {
      return "Inicia Sesión para preservar los datos";
    }
    const docRef = doc(db, COLLECTIONS.STUDENT_PROGRESS, user.uid);
    await setDoc(docRef, { progress });

    return `Se guardo el progreso`;
  } catch (error) {
    console.error(error);
    return `Ocurrio un error al subir el progreso`;
  }
};

export const loadProgress = async (user) => {
  try {
    if (!user) {
      return [];
    }
    const docRef = doc(db, COLLECTIONS.STUDENT_PROGRESS, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().progress;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
