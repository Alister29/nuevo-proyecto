import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../database/firebaseConfig";
import { COLLECTIONS } from "../database/collections";
import { useAuth } from "../context/AuthContext";

/**
 * Obtiene el horario guardado del usuario en Firebase.
 */
async function cargarHorarioDesdeFirebase(setMateriasAsignadas) {
  const { user } = useAuth(); // Obtener usuario desde el contexto

  if (!user) {
    console.error("❌ Usuario no autenticado.");
    return;
  }

  const userId = user.uid; // Obtener el ID del usuario

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
async function guardarHorarioEnFirebase(materiasAsignadas) {
  const { user } = useAuth(); // Obtener usuario desde el contexto

  if (!user) {
    console.error("❌ Usuario no autenticado.");
    return;
  }

  const userId = user.uid; // Obtener el ID del usuario

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
