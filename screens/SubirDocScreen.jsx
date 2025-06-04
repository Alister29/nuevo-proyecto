import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, Alert, Modal, Platform, ScrollView
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';
import { db } from "../database/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { format } from 'date-fns'; 
import { getAuth } from 'firebase/auth';
import { COLLECTIONS } from "../database";

export const SubirDocScreen = () => {
  const [documentos, setDocumentos] = useState([]);
  const [materia, setMateria] = useState('');
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [previewUri, setPreviewUri] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);
  const [errorMateria, setErrorMateria] = useState(false);
  const [errorCategoria, setErrorCategoria] = useState(false);
  const [errorTitulo, setErrorTitulo] = useState(false);
  const [errorDocumentos, setErrorDocumentos] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const botonActivo = documentos.length > 0;

  const agregarDocumento = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      if (file.size <= 1024 * 1024) {
        setDocumentos([...documentos, file]);
        setErrorDocumentos(false);
      } else {
        Alert.alert("Error", "El archivo excede el límite de 1MB.");
      }
    }
  };

  const subirDatos = async () => {
    const validMateria = materia !== '';
    const validCategoria = categoria !== '';
    const validTitulo = titulo.trim() !== '';
    const validDocs = documentos.length > 0;

    setErrorMateria(!validMateria);
    setErrorCategoria(!validCategoria);
    setErrorTitulo(!validTitulo);
    setErrorDocumentos(!validDocs);

    if (!validMateria || !validCategoria || !validTitulo || !validDocs) {
      Alert.alert("Faltan campos", "Completa todos los campos obligatorios.");
      return;
    }

    setSubiendo(true);
    setMensaje("Subiendo...");

    try {
      for (const file of documentos) {
        const base64 = await convertirABase64(file.uri);
        await addDoc(collection(db, "documentos_base64"), {
          titulo,
          materia,
          categoria,
          nombreArchivo: file.name,
          creadoEn: Timestamp.now(),
          base64Contenido: base64,
          aprobado: false,
          usuarioId: user?.uid || null,
          emailUsuario: user?.email || null,
        });
      }

      const nuevoRegistro = {
        titulo,
        fecha: new Date().toISOString(),
        estado: 'pendiente',
        archivo: documentos[0]?.name,
        pesoKB: Math.round(documentos[0]?.size / 1024),
      };

      setHistorial([nuevoRegistro, ...historial]);

      setMensaje("Documentos subidos correctamente. Esperando aprobación del administrador.");
      setDocumentos([]);
      setMateria('');
      setCategoria('');
      setTitulo('');
    } catch (error) {
      console.error("Error al subir documentos:", error);
      setMensaje("Ocurrió un error al subir los documentos.");
    } finally {
      setSubiendo(false);
      setTimeout(() => setMensaje(''), 5000);
    }
  };

  const convertirABase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const quitarDocumento = (index) => {
    const nuevos = [...documentos];
    nuevos.splice(index, 1);
    setDocumentos(nuevos);
  };

  const verDocumento = async (file) => {
    const base64 = await convertirABase64(file.uri);
    setPreviewUri(base64);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Materia*</Text>
      <View style={[styles.pickerBox, errorMateria && styles.errorInput]}>
        <Picker
          selectedValue={materia}
          onValueChange={(val) => {
            setMateria(val);
            setErrorMateria(false);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar materia" value="" enabled={false} />
          {COLLECTIONS.DOCUMENT_SUBJECTS.map((m) => (
            <Picker.Item label={m} value={m} key={m} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Categoría*</Text>
      <View style={[styles.pickerBox, errorCategoria && styles.errorInput]}>
        <Picker
          selectedValue={categoria}
          onValueChange={(val) => {
            setCategoria(val);
            setErrorCategoria(false);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar categoría" value="" enabled={false} />
          {COLLECTIONS.DOCUMENT_CATEGORIES.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Título*</Text>
      <TextInput
        style={[styles.input, errorTitulo && styles.errorInput]}
        placeholder="Ej. Apuntes de Cálculo I"
        value={titulo}
        onChangeText={(text) => {
          setTitulo(text);
          setErrorTitulo(false);
        }}
      />
      {errorTitulo && <Text style={styles.errorText}>Este campo es obligatorio.</Text>}

      <View style={styles.documentosHeader}>
        <Text style={styles.label}>Documentos*</Text>
        <TouchableOpacity onPress={agregarDocumento} style={styles.botonAnadirMini}>
          <Text style={styles.botonAnadirMiniTexto}>➕ Añadir documento</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contenedorArchivos}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, { flex: 4 }]}>Nombre</Text>
          <Text style={[styles.tableCell, { flex: 2, textAlign: 'center' }]}>Peso</Text>
          <Text style={[styles.tableCell, { flex: 2, textAlign: 'center' }]}>Ver</Text>
          <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>Quitar</Text>
        </View>

        {errorDocumentos && (
          <Text style={styles.errorText}>Debes subir al menos un documento.</Text>
        )}

        <FlatList
          data={documentos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text numberOfLines={1} ellipsizeMode="middle" style={[styles.tableCell, { flex: 4 }]}>{item.name}</Text>
              <Text style={[styles.tableCell, { flex: 2, textAlign: 'center' }]}>{(item.size / 1024).toFixed(0)}kb</Text>
              <TouchableOpacity onPress={() => verDocumento(item)} style={{ flex: 2, alignItems: 'center' }}>
                <Text>🔍</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => quitarDocumento(index)} style={{ flex: 1, alignItems: 'center' }}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>

      <Text style={styles.leyenda}>* Campos obligatorios</Text>
      <Text style={styles.leyenda}>* Límite por archivo 1MB</Text>
      <Text style={styles.leyenda}>* Los archivos deberán aprobarse para aparecer públicamente</Text>

      <TouchableOpacity
        style={[styles.botonSubir, { backgroundColor: botonActivo ? '#007AFF' : '#ccc' }]}
        onPress={() => setMostrarConfirmacion(true)}
        disabled={!botonActivo}
      >
        <Text style={styles.botonSubirTexto}>Subir</Text>
      </TouchableOpacity>

      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}

      {historial.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Historial de documentos subidos:</Text>
          {historial.map((item, index) => (
            <Text key={index} style={{ fontSize: 12 }}>
              📄 {item.titulo} - {format(new Date(item.fecha), 'dd/MM/yyyy HH:mm')} ({item.estado || 'pendiente'})
            </Text>
          ))}
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 10, backgroundColor: '#ccc' }}>
            <Text style={{ textAlign: 'center' }}>Cerrar vista previa</Text>
          </TouchableOpacity>
          {previewUri && (
            Platform.OS === 'web' ? (
              <iframe src={previewUri} style={{ flex: 1, width: '100%', height: '100%' }} title="Vista previa del documento" />
            ) : (
              <WebView source={{ uri: previewUri }} style={{ flex: 1 }} useWebKit originWhitelist={['*']} allowFileAccess startInLoadingState />
            )
          )}
        </View>
      </Modal>

      <Modal
        visible={mostrarConfirmacion}
        transparent
        animationType="slide"
        onRequestClose={() => setMostrarConfirmacion(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTexto}>
              ¿Subir {titulo || 'los documentos'}?
            </Text>
            <View style={styles.modalBotones}>
              <TouchableOpacity
                style={styles.botonModalSubir}
                onPress={() => {
                  setMostrarConfirmacion(false);
                  subirDatos();
                }}
              >
                <Text style={styles.textoModalSubir}>Subir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonModalCancelar}
                onPress={() => setMostrarConfirmacion(false)}
              >
                <Text style={styles.textoModalCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  pickerBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    marginBottom: 10,
  },
  picker: { height: 40 },
  documentosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  botonAnadirMini: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botonAnadirMiniTexto: { fontWeight: 'bold' },
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
    marginTop: 20,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  botonSubirTexto: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mensaje: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007700',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 4,
  },
  contenedorArchivos: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    height: 160,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  modalFondo: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContenido: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  botonModalSubir: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  textoModalSubir: {
    color: 'black',
    fontWeight: 'bold',
  },
  botonModalCancelar: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  textoModalCancelar: {
    color: 'black',
    fontWeight: 'bold',
  },
});
