import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { COLLECTIONS } from "../database/collections";

/**
 * Obtiene el horario guardado del usuario en Firebase.
 */
async function cargarHorarioDesdeFirebase(userId, setMateriasAsignadas) {
  if (!userId) {
    console.error("❌ Usuario no autenticado.");
    return;
  }

  try {
    const docSnap = await getDoc(doc(db, "horarios", userId));
    if (docSnap.exists()) {
      setMateriasAsignadas(docSnap.data().horario);
    }
  } catch (error) {
    console.error("Error al cargar el horario:", error);
  }
}

/**
 * Guarda el horario seleccionado del usuario autenticado en Firestore.
 */
async function guardarHorarioEnFirebase(userId, materiasAsignadas) {
  if (!userId) {
    console.error("❌ Usuario no autenticado.");
    return;
  }

  try {
    await setDoc(doc(db, "horarios", userId), {
      horario: materiasAsignadas,
    });
    console.log("✅ Horario guardado correctamente.");
  } catch (error) {
    console.error("Error al guardar el horario:", error);
  }
}
export { guardarHorarioEnFirebase, cargarHorarioDesdeFirebase };

export const uploadCareerSchedules = async (carrera, horarios) => {
  try {
    await setDoc(doc(db, COLLECTIONS.CAREER_SCHEDULES, carrera), horarios);
  } catch (error) {
    throw new Error(error.message);
  }
};
