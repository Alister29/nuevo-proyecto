import { db } from "../database";
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
