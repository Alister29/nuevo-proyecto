import React, { useEffect, useState } from "react";
import {
  View, Text, Button, Modal, ScrollView, StyleSheet, TouchableOpacity, Alert
} from "react-native";
import scheduleData from "../context/scheduleData";
import { guardarHorarioEnFirebase, cargarHorarioDesdeFirebase } from "../services/scheduleService";

// Días y horas en la cuadrícula del horario
const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const horas = [
  "06:45-08:15", "08:15-09:45", "09:45-11:15",
  "11:15-12:45", "12:45-14:15", "14:15-15:45",
  "15:45-17:15", "17:15-18:45", "18:45-20:15", "20:15-21:45"
];

// Función para generar colores aleatorios por materia
const getColorForSubject = (subject) => {
  const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFECB3", "#E1BEE7", "#D1C4E9", "#B2EBF2"];
  return colors[subject.charCodeAt(0) % colors.length];
};
const guardarHorario = () => {
  if (choquesMaterias.length > 0) {
    Alert.alert("Error", "No puedes guardar el horario mientras haya choques.");
    return;
  }
  guardarHorarioEnFirebase(materiasAsignadas);
};
export const HorarioScreen = () => {
  const [materiasAsignadas, setMateriasAsignadas] = useState([]);
  const [modalMateriasVisible, setModalMateriasVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState({});
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [choquesMaterias, setChoquesMaterias] = useState([]);
  const [docentesConChoque, setDocentesConChoque] = useState([]);

  useEffect(() => {
    cargarHorarioDesdeFirebase((materiasCargadas) => {
      setMateriasAsignadas(materiasCargadas);
      setDocenteSeleccionado(
        materiasCargadas.reduce((acc, materia) => {
          acc[materia.nombre] = { grupo: materia.grupo };
          return acc;
        }, {})
      );
    });
  }, []);

  useEffect(() => {
    // Identificar materias en conflicto
    const materiasConChoque = materiasAsignadas
      .filter(materia => materiasAsignadas.filter(m => m.dia === materia.dia && m.hora === materia.hora).length > 1)
      .map(m => m.nombre);
  
    setChoquesMaterias(materiasConChoque);
  
    // Identificar docentes en conflicto
    const docentesConChoqueDetectados = materiasAsignadas
      .filter(materia => materiasConChoque.includes(materia.nombre))
      .map(m => `${m.nombre}-${m.grupo}`);
  
    setDocentesConChoque(docentesConChoqueDetectados);
  }, [materiasAsignadas]);

  const seleccionarMateria = (materia) => {
    setSelectedSubject(selectedSubject === materia ? null : materia);
  };
  

  // Manejo de selección de materia
  const seleccionarDocente = (materia, docente) => {
    const key = `${materia.nombre}-${docente.grupo}`;
    const isAlreadyAssigned = docenteSeleccionado[materia.nombre]?.grupo === docente.grupo;

    // ✅ Si el docente ya está asignado, permitir la deselección
    if (isAlreadyAssigned) {
        setMateriasAsignadas(prev => prev.filter(m => m.nombre !== materia.nombre || m.grupo !== docente.grupo));
        setDocenteSeleccionado(prev => {
            const updated = { ...prev };
            delete updated[materia.nombre]; // ✅ Eliminar correctamente del estado
            return updated;
        });
        return;
    }

    // ✅ Si otro docente ya está asignado en esta materia, bloquear la selección
    if (docenteSeleccionado[materia.nombre]) {
        Alert.alert("Error", "Solo puedes seleccionar un docente por materia.");
        return;
    }

    // ✅ Asignar el nuevo docente con su grupo correctamente
    setDocenteSeleccionado(prev => ({ ...prev, [materia.nombre]: { nombre: docente.nombre, grupo: docente.grupo } }));

    const nuevosHorarios = docente.horarios.map(horario => ({
        nombre: materia.nombre,
        grupo: docente.grupo,
        dia: horario.dia,
        hora: horario.hora,
        aula: horario.aula,
        aux: horario.aux,
        color: getColorForSubject(materia.nombre)
    }));

    setMateriasAsignadas(prev => [...prev, ...nuevosHorarios]);
};



  // Función para expandir/contraer niveles
  const toggleLevel = (level) => {
    setSelectedLevel(selectedLevel === level ? null : level);
    setSelectedSubject(null); // Contraer materias al cambiar de nivel
  };

  return (
    
    <View style={{ flex: 1, padding: 10 }}>
       {/* Mensaje de notificación al inicio */}
      <View style={styles.notificationBox}>
        <Text style={styles.notificationText}>
         Ten en cuenta lo siguiente: solo puedes seleccionar un docente por materia, 
         El símbolo ✳ antes de una materia significa que es una auxiliatura.
        </Text>
      </View>
      {/* Cuadrícula del Horario con colores */}
      <ScrollView horizontal>
        <ScrollView>
          <View style={styles.scheduleContainer}>
            <View style={styles.headerRow}>
              <View style={styles.hourCell}><Text style={styles.headerText}>Hora</Text></View>
              {diasSemana.map((dia) => (
                <View key={dia} style={styles.headerCell}>
                  <Text style={styles.headerText}>{dia}</Text>
                </View>
              ))}
            </View>
            {horas.map((hora) => (
              <View key={hora} style={styles.row}>
                <View style={styles.hourCell}><Text style={styles.hourText}>{hora}</Text></View>
                {diasSemana.map((dia) => {
                  const assignments = materiasAsignadas.filter((a) => a.dia === dia && a.hora === hora);

                  return (
                    <View key={dia} style={[styles.cell, assignments.length > 1 && styles.cellChoque]}>
                      {assignments.length > 1 ? (
                        <Text style={styles.cellErrorText}>Existe un choque de horarios</Text>
                      ) : (
                        assignments.map((materia, index) => (
                          <Text key={index} style={[styles.cellText, { backgroundColor: materia.color }]}>
                            {materia.aux ? "✳ " : ""}{materia.nombre} {materia.aula} {materia.grupo}
                          </Text>
                        ))
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      <Button title="Ver Materias" onPress={() => setModalMateriasVisible(true)} color={choquesMaterias.length > 0 ? "red" : "blue"}/>
      <Button title="Guardar horario" onPress={guardarHorario} color={choquesMaterias.length > 0 ? "red" : "blue"} />

      {/* Modal para seleccionar materias por nivel */}
      <Modal visible={modalMateriasVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalScroll}>
            {Object.keys(scheduleData).map((level) => (
              <View key={level}>
                <TouchableOpacity onPress={() => toggleLevel(level)} style={styles.nivelTitulo}>
                  <Text style={styles.materiaTitulo}>{level}</Text>
                </TouchableOpacity>

                {/* Si el nivel está expandido, mostrar sus materias debajo */}
                {selectedLevel === level && (
                  <View>
                    {scheduleData[level]?.map((subject, index) => (
                      <View key={index} style={styles.materiaContainer}>
                        <TouchableOpacity onPress={() => seleccionarMateria(subject)}>
                          <Text style={[styles.materiaTitulo, selectedSubject === subject && styles.materiaSeleccionada, choquesMaterias.includes(subject.nombre) && styles.elementoRojo]}>
                            {subject.nombre}
                          </Text>
                        </TouchableOpacity>

                        {/* Si la materia está expandida, mostrar los docentes debajo */}
                        {selectedSubject === subject && subject.docentes.map((docente, i) => {
                          const docenteKey = `${subject.nombre}-${docente.grupo}`;
                          return (
                          <TouchableOpacity key={i} onPress={() => seleccionarDocente(subject, docente)} style={[styles.docenteItem, docentesConChoque.includes(docenteKey) && styles.elementoRojo]}>
                            <Text>{docente.grupo} {docente.nombre}</Text>
                          </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          <Button title="Cerrar" onPress={() => setModalMateriasVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};


// Estilos
const styles = StyleSheet.create({
  elementoRojo: { backgroundColor: "red", color: "white",},
  scheduleContainer: { backgroundColor: "#E0F7FA" },
  headerRow: { flexDirection: "row", backgroundColor: "#B2EBF2" },
  headerCell: { width: 120, borderWidth: 1, alignItems: "center", justifyContent: "center", padding: 5 },
  hourCell: { width: 120, borderWidth: 1, backgroundColor: "#B2EBF2", alignItems: "center", justifyContent: "center", padding: 5 },
  row: { flexDirection: "row" },
  cell: { width: 120, borderWidth: 1, alignItems: "center", justifyContent: "center", padding: 5, minHeight: 60, flexWrap: 'wrap' },
  cellChoque: { backgroundColor: "red" },
  cellErrorText: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalContainer: { flex: 1, padding: 20, backgroundColor: "white" },
  nivelTitulo: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  materiaTitulo: { fontSize: 16, padding: 10, backgroundColor: "#007AFF", color: "white" },
  materiaSeleccionada: { backgroundColor: "#005BB5" },
  docenteItem: { fontSize: 14, paddingVertical: 5, color: "white", backgroundColor: "#007AFF", marginBottom: 2 },
  notificationBox: {
    backgroundColor: "#007AFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  notificationText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  
});
