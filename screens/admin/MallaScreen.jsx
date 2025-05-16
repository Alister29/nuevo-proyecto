import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView,} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";
import { Picker } from "@react-native-picker/picker";
import { Modal } from "../../components/Modal"; 
import { subirPensum } from "../../services/pensumService";

export const MallaScreen = () => {
  const [carrera, setCarrera] = useState("Ing. Sistemas");
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

  const seleccionarArchivo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "text/csv" });
      if (res.canceled) return;

      setFileName(res.assets[0].name);
      const fileUri = res.assets[0].uri;
      const fileContent = await fetch(fileUri).then((r) => r.text());

      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => {
          const normalizado = data.map((row) => ({
            nivel: row.nivel || row.Nivel || "",
            codigo: row.codigo || row.Código || "",
            materia: row.materia || row.Materia || "",
            tipo: row.tipo || row.Tipo || "",
            electiva: row.electiva || row.Electiva || "",
            prereq:
              row.prereq ||
              row.Prereq ||
              row.prerequisitos ||
              row.Prerequisitos ||
              "",
          }));
          setCsvData(normalizado);
        },
        error: (err) => Alert.alert("Error al parsear CSV", err.message),
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const agruparPorNivel = () => {
    const agrupado = {};
    csvData.forEach(({ nivel, ...rest }) => {
      if (!agrupado[nivel]) agrupado[nivel] = [];
      agrupado[nivel].push(rest);
    });
    return agrupado;
  };

  const subirDatos = async () => {
    const pensum = agruparPorNivel();
    const respuesta = await subirPensum(carrera, pensum);
    console.log(respuesta);

    // Limpiar estado
    setCsvData([]);
    setFileName(null);
    setModalConfirmVisible(false);
    setModalSuccessVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nivel}</Text>
      <Text style={styles.cell}>{item.codigo}</Text>
      <Text style={styles.cellMateria}>{item.materia}</Text>
      <Text style={styles.cell}>{item.tipo}</Text>
      <Text style={styles.cell}>{item.electiva}</Text>
      <Text style={styles.cell}>{item.prereq || "–"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Seleccionar carrera</Text>
      <Picker
        selectedValue={carrera}
        onValueChange={(val) => setCarrera(val)}
        style={styles.picker}
      >
        <Picker.Item label="Ing. Sistemas" value="Ing. Sistemas" />
        <Picker.Item label="Ing. Informática" value="Ing. Informática" />
      </Picker>

      <Text style={styles.label}>Seleccionar CSV</Text>
      <TouchableOpacity onPress={seleccionarArchivo} style={styles.botonExaminar}>
        <Text style={styles.botonExaminarTexto}>
          {fileName || "Examinar..."}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Previsualización</Text>
      <View style={styles.previewContainer}>
        {csvData.length > 0 ? (
          <ScrollView horizontal>
            <View>
              <View style={[styles.row, styles.headerRow]}>
                <Text style={styles.cellHeader}>Nivel</Text>
                <Text style={styles.cellHeader}>Código</Text>
                <Text style={styles.cellHeaderMateria}>Materia</Text>
                <Text style={styles.cellHeader}>Tipo</Text>
                <Text style={styles.cellHeader}>Electiva</Text>
                <Text style={styles.cellHeader}>Prerequisitos</Text>
              </View>
              <FlatList
                data={csvData}
                renderItem={renderItem}
                keyExtractor={(_, i) => i.toString()}
              />
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.placeholder}>No hay datos para mostrar</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.botonSubir,
          csvData.length === 0 && styles.botonDeshabilitado,
        ]}
        disabled={csvData.length === 0}
        onPress={() => setModalConfirmVisible(true)}
      >
        <Text style={styles.botonSubirTexto}>Subir</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <Modal isVisible={modalConfirmVisible} closeFn={() => setModalConfirmVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            ¿Subir malla curricular para la carrera {carrera}?
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
      <Modal isVisible={modalSuccessVisible} closeFn={() => setModalSuccessVisible(false)}>
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
  label: {marginTop: 10 },
  picker: { backgroundColor: "#f0f0f0", marginVertical: 5 },
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
    height: 250,
    marginTop: 5,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 4,
  },
  cellHeader: {
    width: 100,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  cellHeaderMateria: {
    width: 160,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  cell: {
    width: 100,
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 4,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  cellMateria: {
    width: 150,
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 4,
    flexWrap: "wrap",
    flexShrink: 1,
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
  botonDeshabilitado: { backgroundColor: "#ccc"},
  botonSubirTexto: { color: "#000"},
});
