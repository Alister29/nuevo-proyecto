import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import { Modal, ParsePDF } from "../../components";
import { uploadCareerSchedules } from "../../services";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const HorarioScreen = () => {
  const [carrera, setCarrera] = useState("Ing. Sistemas");
  const [pdfData, setPdfData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileURI, setFileURI] = useState(null);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const { height } = Dimensions.get("window");

  const seleccionarArchivo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (res.canceled) return;

      setFileName(res.assets[0].name);
      const fileURI = res.assets[0].uri;
      const file64 =
        "data:application/pdf;base64," +
        (await FileSystem.readAsStringAsync(fileURI, {
          encoding: FileSystem.EncodingType.Base64,
        }));
      setFileURI(file64);
      

      //const fileContent = await fetch(fileUri).then((r) => r.arrayBuffer());
      //console.log(fileContent);

      //const newPDFData = await pdfParser.parse(fileContent);
      //setPdfData(newPDFData);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const subirDatos = async () => {
    if (!pdfData) return;

    try {
      const respuesta = await uploadCareerSchedules(carrera, pdfData);
    } catch (error) {
      Alert.alert("Ocurrio un error");
    }

    // Limpiar estado
    setPdfData(null);
    setFileName(null);
    setModalConfirmVisible(false);
    setModalSuccessVisible(true);
  };

  const renderHorario = () => {
    return Object.entries(pdfData).map(([nivel, materias]) => (
      <View key={nivel} style={styles.nivelContainer}>
        <Text style={styles.nivelTitulo}>Nivel {nivel}</Text>
        {materias.map((materia, index) => (
          <View key={index} style={styles.materiaContainer}>
            {materia.docentes.map((docente, idx) => (
              <View key={idx} style={styles.docenteRow}>
                {/* Columna izquierda */}
                <View style={styles.columnaIzquierda}>
                  <Text style={styles.textoMateria}>{materia.nombre}</Text>
                  <Text style={styles.textoGrupo}>{docente.grupo}</Text>
                  <Text style={styles.textoDocente}>{docente.nombre}</Text>
                </View>

                {/* Columna derecha */}
                <View style={styles.columnaDerecha}>
                  {docente.horarios.map((horario, hIdx) => (
                    <Text key={hIdx} style={styles.textoHorario}>
                      {horario.dia.slice(0, 2).toUpperCase()} {horario.hora}{" "}
                      {horario.aula}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelMinimal}>Seleccionar carrera</Text>
      <Picker
        selectedValue={carrera}
        onValueChange={(val) => setCarrera(val)}
        style={styles.inputMinimal}
      >
        <Picker.Item label="Ing. Sistemas" value="Ing. Sistemas" />
        <Picker.Item label="Ing. Informática" value="Ing. Informática" />
      </Picker>

      <Text style={styles.labelMinimal}>Seleccionar PDF</Text>
      <TouchableOpacity
        onPress={seleccionarArchivo}
        style={styles.inputMinimalRow}
      >
        <Icon
          name="paperclip"
          size={18}
          color="#555"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.fileText}>{fileName || "Examinar..."}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Previsualización</Text>
      <View style={[styles.previewContainer, { height: height - 410 }]}>
        {pdfData ? (
          <ScrollView>
            <ScrollView>{renderHorario()}</ScrollView>
          </ScrollView>
        ) : (
          <Text style={styles.placeholder}>No hay datos para mostrar</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.botonSubir, !pdfData && styles.botonDeshabilitado]}
        disabled={!pdfData}
        onPress={() => setModalConfirmVisible(true)}
      >
        <Text style={styles.botonSubirTexto}>Subir</Text>
      </TouchableOpacity>

      {fileURI && <ParsePDF uri={fileURI} onExtract={setPdfData} />}

      {/* Modal de confirmación */}
      <Modal
        isVisible={modalConfirmVisible}
        closeFn={() => setModalConfirmVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            ¿Subir horarios para la carrera {carrera}?
          </Text>
          <View style={styles.modalButtonsRow}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#69C7F9" }]}
              onPress={subirDatos}
            >
              <Text>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#e0e0e0" }]}
              onPress={() => setModalConfirmVisible(false)}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de éxito */}
      <Modal
        isVisible={modalSuccessVisible}
        closeFn={() => setModalSuccessVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Se subió la malla curricular para la carrera {carrera}
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { marginTop: 10 },
  picker: { backgroundColor: "#f0f0f0", marginVertical: 5 },
  labelMinimal: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
    fontWeight: "500",
  },

  inputMinimal: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 3,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  inputMinimalRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },

  fileText: {
    color: "#555",
    fontSize: 14,
  },
  botonExaminar: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  botonExaminarTexto: {},
  previewContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    height: 230,
    marginTop: 5,
  },
  modalButton: {
    padding: 12,
    borderRadius: 12,
    width: 100,
    alignItems: "center",
  },
  modalContainer: {
    padding: 24,
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  placeholder: { textAlign: "center", marginTop: 20, color: "#888" },
  botonSubir: {
    backgroundColor: "#69C7F9",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  botonDeshabilitado: { backgroundColor: "#ccc" },
  botonSubirTexto: { color: "#000" },
  nivelContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },

  nivelTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },

  materiaContainer: {
    marginBottom: 10,
  },

  docenteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  columnaIzquierda: {
    flex: 1,
    paddingRight: 8,
  },

  columnaDerecha: {
    flex: 1,
  },

  textoMateria: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },

  textoGrupo: {
    fontSize: 13,
    color: "#444",
    marginBottom: 2,
  },

  textoDocente: {
    fontSize: 13,
    color: "#666",
  },

  textoHorario: {
    fontSize: 13,
    marginBottom: 2,
  },
});
