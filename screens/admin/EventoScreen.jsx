import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

export const EventoScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipoEvento, setTipoEvento] = useState("seminario");
  const [imagenB64, setImagenB64] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  const [eventos, setEventos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "eventos"));
      const eventosDB = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventos(eventosDB);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const base64Image = result.assets[0].base64;
      setImagenB64(base64Image);
    }
  };

  const subirOEditarEvento = async () => {
    if (!titulo || !descripcion || !fecha || !imagenB64 || !tipoEvento) {
      Alert.alert("Faltan campos", "Completa todos los campos.");
      return;
    }

    try {
      setSubiendo(true);
      const eventoData = {
        titulo,
        descripcion,
        tipo: tipoEvento,
        fecha: Timestamp.fromDate(new Date(fecha)),
        imagenB64,
      };

      if (editandoId) {
        const ref = doc(db, "eventos", editandoId);
        await updateDoc(ref, eventoData);
        Alert.alert("Éxito", "Evento actualizado correctamente.");
      } else {
        await addDoc(collection(db, "eventos"), eventoData);
        Alert.alert("Éxito", "Evento subido correctamente.");
      }

      limpiarFormulario();
      cargarEventos();
    } catch (error) {
      console.error("Error al guardar evento:", error);
      Alert.alert("Error", "No se pudo guardar el evento.");
    } finally {
      setSubiendo(false);
    }
  };

  const limpiarFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setFecha("");
    setTipoEvento("seminario");
    setImagenB64(null);
    setEditandoId(null);
  };

  const seleccionarParaEditar = (evento) => {
    setTitulo(evento.titulo);
    setDescripcion(evento.descripcion);
    setFecha(new Date(evento.fecha.toDate()).toISOString().split("T")[0]);
    setTipoEvento(evento.tipo);
    setImagenB64(evento.imagenB64);
    setEditandoId(evento.id);
  };

  const eliminarEvento = (id) => {
    Alert.alert(
      "¿Eliminar evento?",
      "Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "eventos", id));
              Alert.alert("Evento eliminado");
              cargarEventos();
              if (editandoId === id) limpiarFormulario();
            } catch (error) {
              console.error("Error al eliminar evento:", error);
              Alert.alert("Error", "No se pudo eliminar el evento.");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventContent}>
        <TouchableOpacity
          onPress={() => seleccionarParaEditar(item)}
          style={{ flex: 1 }}
        >
          <Text style={styles.eventTitle}>{item.titulo}</Text>
          <Text>{item.descripcion}</Text>
          <Text style={{ color: "#666" }}>
            {new Date(item.fecha.toDate()).toLocaleDateString()}
          </Text>
          <Text style={{ fontStyle: "italic" }}>{item.tipo}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => eliminarEvento(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>{editandoId ? "Editar Evento" : "Nuevo Evento"}</Text>

      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título del evento"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del evento"
        multiline
      />

      <Text style={styles.label}>Fecha (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={fecha}
        onChangeText={setFecha}
        placeholder="2025-05-14"
      />

      <Text style={styles.label}>Tipo de evento:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipoEvento} onValueChange={setTipoEvento}>
          <Picker.Item label="Seminario" value="seminario" />
          <Picker.Item label="Curso" value="curso" />
          <Picker.Item label="Taller" value="taller" />
          <Picker.Item label="Feria" value="feria" />
        </Picker>
      </View>

      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {imagenB64 && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imagenB64}` }}
          style={styles.imagePreview}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title={subiendo ? "Guardando..." : editandoId ? "Guardar Cambios" : "Subir Evento"}
          onPress={subirOEditarEvento}
          disabled={subiendo}
        />
      </View>

      {editandoId && (
        <View style={{ marginTop: 10 }}>
          <Button title="Cancelar Edición" color="gray" onPress={limpiarFormulario} />
        </View>
      )}

      <Text style={[styles.label, { marginTop: 30 }]}>Eventos existentes:</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  eventItem: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  eventContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 16,
  },
});
