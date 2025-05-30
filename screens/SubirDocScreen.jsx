import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import * as WebBrowser from 'expo-web-browser';
import { WebView } from 'react-native-webview';
import { storage, db } from "../database/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const SubirDocScreen = () => {
  const [documentos, setDocumentos] = useState([]);
  const [materia, setMateria] = useState('');
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [previewUri, setPreviewUri] = useState(null);

  const agregarDocumento = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      if (file.size <= 1024 * 1024) {
        setDocumentos([...documentos, file]);
      } else {
        alert("El archivo excede el límite de 1MB");
      }
    }
  };

  const subirDatos = async () => {
    if (!materia || !categoria || !titulo || documentos.length === 0) {
      Alert.alert("Faltan campos", "Completa todos los campos obligatorios.");
      return;
    }

    try {
      for (const file of documentos) {
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `documentos/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, blob);

        await addDoc(collection(db, "documentos"), {
          titulo,
          materia,
          categoria,
          nombreArchivo: file.name,
          creadoEn: Timestamp.now(),
          storagePath: storageRef.fullPath,
        });
      }

      Alert.alert("Éxito", "Documentos subidos correctamente.");
      setDocumentos([]);
      setMateria('');
      setCategoria('');
      setTitulo('');
    } catch (error) {
      console.error("Error al subir documentos:", error);
      Alert.alert("Error", "Ocurrió un error al subir los documentos.");
    }
  };

  const quitarDocumento = (index) => {
    const nuevos = [...documentos];
    nuevos.splice(index, 1);
    setDocumentos(nuevos);
  };

  const verDocumento = (uri) => {
    setPreviewUri(uri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Materia */}
      <Text style={styles.label}>Materia*</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={materia} onValueChange={(v) => setMateria(v)}>
          <Picker.Item label="Selecciona una materia" value="" />
          <Picker.Item label="Álgebra" value="algebra" />
          <Picker.Item label="Cálculo" value="calculo" />
          <Picker.Item label="Física" value="fisica" />
        </Picker>
      </View>

      {/* Categoría */}
      <Text style={styles.label}>Categoría*</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={categoria} onValueChange={(v) => setCategoria(v)}>
          <Picker.Item label="Selecciona una categoría" value="" />
          <Picker.Item label="Apuntes" value="apuntes" />
          <Picker.Item label="Guías" value="guias" />
          <Picker.Item label="Exámenes" value="examenes" />
        </Picker>
      </View>

      {/* Título */}
      <Text style={styles.label}>Título*</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Apuntes de Cálculo I"
        value={titulo}
        onChangeText={setTitulo}
      />

      {/* Documentos */}
      <Text style={styles.label}>Documentos*</Text>
      <TouchableOpacity onPress={agregarDocumento} style={styles.botonAnadir}>
        <Text style={styles.botonAnadirTexto}>+ Añadir documento</Text>
      </TouchableOpacity>

      {/* Tabla */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 4 }]}>Nombre</Text>
        <Text style={[styles.tableCell, { flex: 2, textAlign: 'center' }]}>Peso</Text>
        <Text style={[styles.tableCell, { flex: 2, textAlign: 'center' }]}>Ver</Text>
        <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>Quitar</Text>
      </View>

      <FlatList
        data={documentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow}>
            <Text numberOfLines={1} ellipsizeMode="middle" style={[styles.tableCell, { flex: 4 }]}>
              {item.name}
            </Text>
            <Text style={[styles.tableCell, { flex: 2, textAlign: 'center' }]}>
              {(item.size / 1024).toFixed(0)}kb
            </Text>
            <TouchableOpacity onPress={() => verDocumento(item.uri)} style={[styles.tableCell, { flex: 2, alignItems: 'center' }]}>
              <Text>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => quitarDocumento(index)} style={{ flex: 1, alignItems: 'center' }}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Leyendas */}
      <Text style={styles.leyenda}>* Campos obligatorios</Text>
      <Text style={styles.leyenda}>* Límite por archivo 1MB</Text>
      <Text style={styles.leyenda}>* Los archivos deberán aprobarse para aparecer públicamente</Text>

      {/* Botón Subir */}
      <TouchableOpacity style={styles.botonSubir} onPress={subirDatos}>
        <Text style={styles.botonSubirTexto}>Subir</Text>
      </TouchableOpacity>

      {/* Modal de vista previa */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 10, alignSelf: 'flex-end' }}>
            <Text style={{ fontSize: 18 }}>❌</Text>
          </TouchableOpacity>
          {previewUri && (
            <WebView source={{ uri: previewUri }} style={{ flex: 1 }} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    marginBottom: 10,
  },
  botonAnadir: {
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
  },
  botonAnadirTexto: { fontWeight: 'bold' },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  tableCell: { fontSize: 12 },
  leyenda: { fontSize: 10, marginTop: 4, color: '#555' },
  botonSubir: {
    backgroundColor: '#49b8ff',
    marginTop: 20,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonSubirTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
