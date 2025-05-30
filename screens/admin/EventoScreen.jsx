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
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
 
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { db } from '../../database'; // Asegúrate de que la ruta sea correcta


export const EventoScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [tipoEvento, setTipoEvento] = useState("seminario");
  const [imagenB64, setImagenB64] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [imagenVisible, setImagenVisible] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");

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

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!titulo.trim()) nuevosErrores.titulo = "El título es obligatorio.";
    if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";

    if (!fecha.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      nuevosErrores.fecha = "La fecha debe tener formato YYYY-MM-DD.";
    }

    if (!hora.trim() || !/^\d{2}:\d{2}$/.test(hora)) {
      nuevosErrores.hora = "La hora debe tener formato HH:MM.";
    }

    if (!fechaFin.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(fechaFin)) {
      nuevosErrores.fechaFin = "La fecha de finalización debe tener formato YYYY-MM-DD.";
    }

    if (!horaFin.trim() || !/^\d{2}:\d{2}$/.test(horaFin)) {
      nuevosErrores.horaFin = "La hora de finalización debe tener formato HH:MM.";
    }

    if (!imagenB64) nuevosErrores.imagen = "Selecciona una imagen.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const subirOEditarEvento = async () => {
    if (!validarCampos()) return;

    try {
      setSubiendo(true);

      const fechaInicio = new Date(`${fecha}T${hora}`);
      const fechaFinal = new Date(`${fechaFin}T${horaFin}`);

      const eventoData = {
        titulo,
        descripcion,
        tipo: tipoEvento,
        fecha: Timestamp.fromDate(fechaInicio),
        fechaFin: Timestamp.fromDate(fechaFinal),
        imagenB64,
      };

      if (editandoId) {
        await updateDoc(doc(db, "eventos", editandoId), eventoData);
        Alert.alert("Éxito", "Evento actualizado correctamente.");
      } else {
        await addDoc(collection(db, "eventos"), eventoData);
        Alert.alert("Éxito", "Evento creado correctamente.");
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
    setHora("");
    setFechaFin("");
    setHoraFin("");
    setTipoEvento("seminario");
    setImagenB64(null);
    setEditandoId(null);
    setErrores({});
  };

  const seleccionarParaEditar = (evento) => {
    const fechaInicio = new Date(evento.fecha.toDate());
    const fechaFinal = new Date(evento.fechaFin?.toDate?.());

    setTitulo(evento.titulo);
    setDescripcion(evento.descripcion);
    setFecha(fechaInicio.toISOString().split("T")[0]);
    setHora(fechaInicio.toTimeString().slice(0, 5));
    setFechaFin(fechaFinal.toISOString().split("T")[0]);
    setHoraFin(fechaFinal.toTimeString().slice(0, 5));
    setTipoEvento(evento.tipo);
    setImagenB64(evento.imagenB64);
    setEditandoId(evento.id);
    setErrores({});
  };

 const eliminarEvento = async (id) => {
  try {
    await deleteDoc(doc(db, "eventos", id));
    setMensajeTexto("Evento eliminado exitosamente");
    setMensajeVisible(true);

    setTimeout(() => {
      setMensajeVisible(false);
    }, 2000);

    cargarEventos();
  } catch (error) {
    console.error("Error al eliminar evento:", error);
  }
};



  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eventTitle}>{item.titulo}</Text>
          <Text>{item.descripcion}</Text>
          <Text style={styles.fechaTexto}>
            {new Date(item.fecha.toDate()).toLocaleDateString()} -{" "}
            {new Date(item.fecha.toDate()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={styles.fechaTexto}>
            Fin: {new Date(item.fechaFin?.toDate?.()).toLocaleDateString()} -{" "}
            {new Date(item.fechaFin?.toDate?.()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={{ fontStyle: "italic" }}>{item.tipo}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => eliminarEvento(item.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>✕ Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => seleccionarParaEditar(item)} style={styles.editButton}>
            <Text style={styles.editButtonText}>✎ Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>{editandoId ? "Editar Evento" : "Nuevo Evento"}</Text>

      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Título del evento" />
      {errores.titulo && <Text style={styles.errorText}>{errores.titulo}</Text>}

      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del evento"
        multiline
      />
      {errores.descripcion && <Text style={styles.errorText}>{errores.descripcion}</Text>}

      <TextInput style={styles.input} value={fecha} onChangeText={setFecha} placeholder="Fecha inicio (YYYY-MM-DD)" />
      {errores.fecha && <Text style={styles.errorText}>{errores.fecha}</Text>}

      <TextInput style={styles.input} value={hora} onChangeText={setHora} placeholder="Hora inicio (HH:MM)" />
      {errores.hora && <Text style={styles.errorText}>{errores.hora}</Text>}

      <TextInput style={styles.input} value={fechaFin} onChangeText={setFechaFin} placeholder="Fecha fin (YYYY-MM-DD)" />
      {errores.fechaFin && <Text style={styles.errorText}>{errores.fechaFin}</Text>}

      <TextInput style={styles.input} value={horaFin} onChangeText={setHoraFin} placeholder="Hora fin (HH:MM)" />
      {errores.horaFin && <Text style={styles.errorText}>{errores.horaFin}</Text>}

      <Text style={styles.label}>Tipo de evento:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipoEvento} onValueChange={setTipoEvento}>
          <Picker.Item label="Seminario" value="seminario" />
          <Picker.Item label="Curso" value="curso" />
          <Picker.Item label="Taller" value="taller" />
          <Picker.Item label="Feria" value="feria" />
          <Picker.Item label="Convocatoria" value="convocatoria" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>

      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {errores.imagen && <Text style={styles.errorText}>{errores.imagen}</Text>}

      {imagenB64 && (
        <TouchableOpacity onPress={() => setImagenVisible(true)}>
          <Image source={{ uri: `data:image/jpeg;base64,${imagenB64}` }} style={styles.imagePreview} />
        </TouchableOpacity>
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

      <Modal visible={imagenVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setImagenVisible(false)}>
            <Text style={styles.modalCloseText}>✕ Cerrar</Text>
          </TouchableOpacity>
          <Image source={{ uri: `data:image/jpeg;base64,${imagenB64}` }} style={styles.fullscreenImage} resizeMode="contain" />
        </View>
      </Modal>
      <Modal transparent={true} visible={mensajeVisible} animationType="fade">
  <View style={styles.mensajeModalContainer}>
    <View style={styles.mensajeBox}>
      <Text style={styles.mensajeTexto}>{mensajeTexto}</Text>
    </View>
  </View>
</Modal>

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
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "#4caf50",
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "80%",
  },
  modalClose: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    marginBottom: 10,
  },
  fechaTexto: {
    color: "#666",
    marginTop: 4,
  },
  mensajeModalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
},
mensajeBox: {
  backgroundColor: "#fff",
  paddingVertical: 20,
  paddingHorizontal: 30,
  borderRadius: 10,
  elevation: 5,
},
mensajeTexto: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#333",
},

});
