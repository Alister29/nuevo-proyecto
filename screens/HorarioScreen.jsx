import React, { useEffect, useState } from "react";
import {
  View, Text, Button, Modal, ScrollView, StyleSheet, TouchableOpacity
} from "react-native";
import scheduleData from "../context/scheduleData";
import { guardarHorarioEnFirebase, cargarHorarioDesdeFirebase } from "../database/firebaseFunctions";

// Días y horas en la cuadrícula del horario
const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const horas = [
  "06:45-08:15", "08:15-09:45", "09:45-11:15",
  "11:15-12:45", "12:45-14:15", "14:15-15:45",
  "15:45-17:15", "17:15-18:45", "18:45-20:15", "20:15-21:45"
];

export const HorarioScreen = () => {
  const [materiasAsignadas, setMateriasAsignadas] = useState([]);
  const [modalMateriasVisible, setModalMateriasVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState({});

  useEffect(() => {
    cargarHorarioDesdeFirebase(setMateriasAsignadas); // Cargar horario guardado en Firebase
  }, []);

  // Manejo de selección y deselección de docente
  const seleccionarDocente = (materia, docente) => {
    const key = `${materia.nombre}-${docente.grupo}`;
    const isAlreadyAssigned = materiasAsignadas.some(m => m.nombre === materia.nombre && m.grupo === docente.grupo);

    if (isAlreadyAssigned) {
      setMateriasAsignadas(prev => prev.filter(m => m.nombre !== materia.nombre || m.grupo !== docente.grupo));
      setDocenteSeleccionado(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } else {
      const nuevosHorarios = docente.horarios.map(horario => ({
        nombre: materia.nombre,
        grupo: docente.grupo,
        dia: horario.dia,
        hora: horario.hora,
        aula: horario.aula,
        aux: horario.aux 
      }));

      setMateriasAsignadas(prev => [...prev, ...nuevosHorarios]);
      setDocenteSeleccionado(prev => ({ ...prev, [key]: docente }));
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Cuadrícula del Horario con formato corregido */}
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
                          <Text key={index} style={styles.cellText}>
                            {materia.aux ? "✳" : ""}{materia.nombre} {materia.grupo} {materia.aula}
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

      <Button title="Ver Materias" onPress={() => setModalMateriasVisible(true)} />
      <Button title="Guardar horario" onPress={() => guardarHorarioEnFirebase(materiasAsignadas)} />

      <Modal visible={modalMateriasVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalScroll}>
            {Object.keys(scheduleData).map((level) => (
              <TouchableOpacity key={level} onPress={() => setSelectedLevel(level)} style={styles.nivelTitulo}>
                <Text style={styles.materiaTitulo}>{level}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {scheduleData[selectedLevel]?.map((subject, index) => (
            <View key={index} style={styles.materiaContainer}>
              <TouchableOpacity onPress={() => setExpandedSubject(expandedSubject === subject ? null : subject)}>
                <Text style={styles.materiaTitulo}>{subject.nombre}</Text>
              </TouchableOpacity>

              {expandedSubject === subject && subject.docentes.map((docente, i) => (
                <TouchableOpacity key={i} onPress={() => seleccionarDocente(subject, docente)} style={[
                  styles.docenteItem,
                  docenteSeleccionado[`${subject.nombre}-${docente.grupo}`] && styles.docenteSeleccionado
                ]}>
                  <Text>{docente.grupo} {docente.nombre}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <Button title="Cerrar" onPress={() => setModalMateriasVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    backgroundColor: "#E0F7FA",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#B2EBF2",
  },
  headerCell: {
    width: 120,  // Fijo igual que la columna de "Hora"
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  hourCell: {
    width: 120,
    borderWidth: 1,
    backgroundColor: "#B2EBF2",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 120,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minHeight: 60,
    flexWrap: 'wrap',
  },
  cellMateria: {
    backgroundColor: "#80DEEA",
  },
  hourText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  cellText: {
    textAlign: "center",
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalScroll: {
    flex: 1,
  },
  nivelTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  materiaContainer: {
    marginTop: 5,
  },
  materiaTitulo: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#007AFF", // Azul
    color: "white",
  },
  materiaSeleccionada: {
    backgroundColor: "#005BB5", // Azul más oscuro al seleccionar
  },
  docenteLista: {
    paddingLeft: 20,
    marginTop: 5,
  },
  docenteItem: {
    fontSize: 14,
    paddingVertical: 5,
    color: "white",
    backgroundColor: "#007AFF",
    marginBottom: 2,
  },
  docenteSeleccionado: {
    fontWeight: "bold",
    backgroundColor: "#005BB5",
  },
  cellChoque: {
    backgroundColor: "red",
  },
  cellErrorText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  
});
