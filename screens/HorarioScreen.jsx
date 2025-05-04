import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
//import { loadScheduleData } from "../context/PdfScheduleLoader"; // por el momento esto estara comentado ya que queria que cargue desde un pdf las materias

// Días y horas usados en la cuadrícula del horario
const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const horas = ["06:45-08:15", "08:15-09:45", "09:45-11:15", "11:15-12:45", "12:45-14:15", "14:15-15:45", "15:45-17:15", "17:15-18:45", "18:45-20:15", "20:15-21:45"];

export const HorarioScreen = () => {
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materiasAsignadas, setMateriasAsignadas] = useState([]);
  const [modalMateriasVisible, setModalMateriasVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("A");
  const [expandedSubject, setExpandedSubject] = useState(null);

  useEffect(() => {
    // Eliminamos la carga desde el PDF para mostrar un horario vacío o estático
    /*
    loadScheduleData().then((data) => {
      setScheduleData(data);
      setLoading(false);
    });
    */
    setScheduleData({}); // 🔵 Usamos un objeto vacío para evitar errores
    setLoading(false);  // 🔵 Desactivamos la pantalla de carga
  }, []);

  const toggleAssignment = (subject, option, chosenTeacher) => {
    const exists = materiasAsignadas.some(
      (a) => a.materia === subject.materia && a.dia === option.dia && a.hora === option.hora
    );
    if (exists) {
      setMateriasAsignadas(
        materiasAsignadas.filter(
          (a) => !(a.materia === subject.materia && a.dia === option.dia && a.hora === option.hora)
        )
      );
    } else {
      setMateriasAsignadas([
        ...materiasAsignadas,
        {
          materia: subject.materia, dia: option.dia,
          hora: option.hora, aula: option.aula, docente: chosenTeacher
        }
      ]);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando datos del PDF...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Cuadrícula del Horario */}
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
                  const assignment = materiasAsignadas.find((a) => a.dia === dia && a.hora === hora);
                  return (
                    <View key={dia} style={[styles.cell, assignment && styles.cellMateria]}>
                      {assignment && <Text style={styles.cellText}>{assignment.materia}</Text>}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Botón para abrir el modal */}
      <View style={styles.buttonContainer}>
        <Button title="Ver Materias" onPress={() => setModalMateriasVisible(true)} />
      </View>

      <Modal visible={modalMateriasVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona Materias</Text>
          {/* Selector de niveles */}
          <ScrollView style={styles.modalScroll}>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => { setSelectedLevel(level); setExpandedSubject(null); }}
                style={[styles.nivelTitulo, selectedLevel === level && styles.materiaSeleccionada]}
              >
                <Text style={styles.materiaTitulo}>{level}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Lista de materias por nivel */}
          <ScrollView>
            {/* Ya no cargamos datos desde el PDF */}
            {scheduleData[selectedLevel]?.map((subject, index) => (
              <View key={index} style={styles.materiaContainer}>
                <TouchableOpacity onPress={() => setExpandedSubject(expandedSubject === subject ? null : subject)}>
                  <Text style={styles.materiaTitulo}>{subject.materia}</Text>
                </TouchableOpacity>
                {expandedSubject === subject && (
                  <View style={styles.docenteLista}>
                    {subject.opciones.map((option, i) => (
                      <TouchableOpacity key={i} onPress={() => toggleAssignment(subject, option, option.docentes[0])}>
                        <Text style={styles.docenteItem}>{option.dia} {option.hora} (Aula: {option.aula})</Text>
                      </TouchableOpacity>
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
});
