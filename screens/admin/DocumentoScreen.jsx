import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import { Modal } from "../../components/Modal"; 
import { db } from "../../database";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const DocumentoScreen = () => {
  const [documentos, setDocumentos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalAprobarVisible, setModalAprobarVisible] = useState(false);
  const [modalRechazarVisible, setModalRechazarVisible] = useState(false);
  const [modalSuccessAprobarVisible, setModalSuccessAprobarVisible] = useState(false);
  const [modalSuccessRechazarVisible, setModalSuccessRechazarVisible] = useState(false);
  const [mensajeRechazo, setMensajeRechazo] = useState("");

  const fetchDocumentos = async () => {
    const querySnapshot = await getDocs(collection(db, "documentos"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(doc => doc.aprobado === null);
    setDocumentos(data);
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const handleConfirmAprobar = async () => {
    if (!selected) return;
    const ref = doc(db, "documentos", selected.id);
    await updateDoc(ref, { aprobado: true, mensaje: "" });
    setModalAprobarVisible(false);
    setSelected(null);
    setModalSuccessAprobarVisible(true);
    fetchDocumentos();
  };

  const handleConfirmRechazar = async () => {
    if (!selected || mensajeRechazo.trim() === "") return;
    const ref = doc(db, "documentos", selected.id);
    await updateDoc(ref, { aprobado: false, mensaje: mensajeRechazo });
    setModalRechazarVisible(false);
    setSelected(null);
    setModalSuccessRechazarVisible(true);
    setMensajeRechazo("");
    fetchDocumentos();
  };

  const { height } = Dimensions.get("window");
  const heightStyle = height - 450;

  if (selected) {
    return (
      <View style={styles.container}>
         <View style={styles.tabContainer}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Materia</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">{selected.materia}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Categoria</Text>
            <Text>{selected.categoria}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Titulo</Text>
            <Text>{selected.titulo}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Subido por</Text>
            <Text>{selected.usuario}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Fecha</Text>
            <Text>{selected.fecha}</Text>
          </View>
        </View>

        <Text style={styles.resultsLabel}>Archivos</Text>
        <View style={[styles.resultsContainer, { height: heightStyle }]}>
          <View style={styles.row}><Text style={styles.col1}>Archivo</Text><Text style={styles.col2}>Peso</Text><Text style={styles.col3}>Ver</Text></View>
          {selected.archivos.map((file, index) => (
            <TouchableOpacity style={styles.row} key={`result-files${index}`}>
              <Text style={styles.col1}>{file.nombre}</Text>
              <Text style={styles.col2}>{file.peso}</Text>
              <Text style={styles.col3}>🔍</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.btnAzul} onPress={() => setModalAprobarVisible(true)}>
          <Text style={styles.btnText}>Aprobar publicación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRojo} onPress={() => setModalRechazarVisible(true)}>
          <Text style={styles.btnText}>Rechazar publicación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGris} onPress={() => setSelected(null)}>
          <Text style={styles.btnText}>Volver a la lista</Text>
        </TouchableOpacity>

        {/* Modal Confirmar Aprobar */}
        <Modal isVisible={modalAprobarVisible} closeFn={() => setModalAprobarVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>¿Aprobar la publicación?</Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#69C7F9" }]} onPress={handleConfirmAprobar}>
                <Text>Aprobar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#ECF4F9" }]} onPress={() => setModalAprobarVisible(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Confirmar Rechazar */}
        <Modal isVisible={modalRechazarVisible} closeFn={() => setModalRechazarVisible(false)}>
          <View style={styles.modalContainerRechazo}>
            <Text style={styles.modalText}>¿Rechazar la publicación?</Text>
            <TextInput
              placeholder="Mensaje de Rechazo*"
              style={styles.input}
              value={mensajeRechazo}
              onChangeText={setMensajeRechazo}
            />
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#FF6767" }]} onPress={handleConfirmRechazar}>
                <Text>Rechazar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#ECF4F9" }]} onPress={() => setModalRechazarVisible(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultsLabel}>Lista de publicaciones pendientes</Text>
      <View style={[styles.resultsContainer, { height: Dimensions.get("window").height - 150 }]}>
        <View style={styles.row}><Text style={styles.col1}>Título</Text><Text style={styles.col2}>Usuario</Text><Text style={styles.col3}>Ver</Text></View>
        <FlatList
          data={documentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row} onPress={() => setSelected(item)}>
              <Text style={styles.col1}>{item.titulo}</Text>
              <Text style={styles.col2}>{item.usuario}</Text>
              <Text style={styles.col3}>▶</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal Éxito Aprobado */}
      <Modal isVisible={modalSuccessAprobarVisible} closeFn={() => setModalSuccessAprobarVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Se aprobó la publicación</Text>
        </View>
      </Modal>

      {/* Modal Éxito Rechazado */}
      <Modal isVisible={modalSuccessRechazarVisible} closeFn={() => setModalSuccessRechazarVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Se rechazó la publicación</Text>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  tabContainer: {
    marginBottom: 5,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  fieldLabel: {
    width: 100,
    fontSize: 14,
    color: "#333",
  },
  resultsLabel: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 4,
    paddingBottom: 10,
    color: "#333",
  },
  resultsContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  headerRow: {
    backgroundColor: "#e0e0e0",
  },
  col1: {
    width: "50%",
    paddingLeft: 4,
  },
  col2: {
    width: "30%",
    paddingLeft: 15,
  },
  col3: {
    width: "20%",
    paddingLeft: 4,
    textAlign: "center",
  },
  btnAzul: {
    backgroundColor: "#69C7F9",
    padding: 13,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15,
  },
  btnRojo: {
    backgroundColor: "#FF6767",
    padding: 13,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 8,
  },
  btnGris: {
    backgroundColor: "#D1DEEA",
    padding: 13,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: {
    textAlign: "center",
    color: "#000",
    fontSize: 15,
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
  modalContainerRechazo: {
    padding: 10,
    margin: 10,
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
});
