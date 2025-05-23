import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../database"; 

/**
 * Obtiene el horario guardado del usuario en Firebase.
 */
async function cargarHorarioDesdeFirebase(setMateriasAsignadas) {
  const user = auth.currentUser;
  if (!user) {
    console.error("❌ Usuario no autenticado.");
    return;
  }

  const userId = user.uid; // Obtiene el ID del usuario autenticado

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
  const user = auth.currentUser;
  if (!user) {
    console.error("❌ Usuario no autenticado.");
    return;
  }

  const userId = user.uid; // Obtiene el ID del usuario autenticado

  try {
    await setDoc(doc(db, "horarios", userId), {
      horario: materiasAsignadas,
    });
    console.log("Horario guardado correctamente.");
  } catch (error) {
    console.error("Error al guardar el horario:", error);
  }
}
export { guardarHorarioEnFirebase, cargarHorarioDesdeFirebase };
