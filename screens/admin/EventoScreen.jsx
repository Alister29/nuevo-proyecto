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
import { Picker } from "@react-native-picker/picker";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../database/firebaseConfig";

export const EventoScreen = () => {
  /* -------------------- state -------------------- */
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

  /* ---------- Cargar eventos desde Firebase ---------- */
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

  /* ---------- Función auxiliar para parsear fecha ---------- */
  const parseFecha = (value) => {
    if (!value) return null;

    if (typeof value?.toDate === "function") {
      return value.toDate().toLocaleDateString();
    }

    if (value instanceof Date && !isNaN(value)) {
      return value.toLocaleDateString();
    }

    if (typeof value === "string") {
      const parsed = new Date(value);
      if (!isNaN(parsed)) return parsed.toLocaleDateString();
    }

    return "—";
  };

  const parseHora = (value) => {
    if (!value) return "—";

    let date;
    if (typeof value?.toDate === "function") {
      date = value.toDate();
    } else if (value instanceof Date && !isNaN(value)) {
      date = value;
    } else if (typeof value === "string") {
      date = new Date(value);
    }

    if (date && !isNaN(date)) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    return "—";
  };

  /* ---------- Selección de imagen ---------- */
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso denegado para acceder a la galería.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImagenB64(result.assets[0].base64);
    }
  };

  /* ---------- Validación de campos ---------- */
  const validarCampos = () => {
    const nuevosErrores = {};

    if (!titulo.trim()) nuevosErrores.titulo = "El título es obligatorio.";
    if (!descripcion.trim())
      nuevosErrores.descripcion = "La descripción es obligatoria.";

    if (!fecha.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(fecha))
      nuevosErrores.fecha = "Fecha inválida. Usa YYYY-MM-DD.";

    if (!hora.trim() || !/^([01]\d|2[0-3]):[0-5]\d$/.test(hora))
      nuevosErrores.hora = "Formato inválido. Usa HH:MM (ej: 15:00).";

    if (
      fechaFin &&
      !/^\d{4}-\d{2}-\d{2}$/.test(fechaFin)
    )
      nuevosErrores.fechaFin = "Fecha fin inválida. Usa YYYY-MM-DD.";

    if (
      horaFin &&
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(horaFin)
    )
      nuevosErrores.horaFin = "Formato inválido. Usa HH:MM.";

    if (!imagenB64) nuevosErrores.imagen = "Selecciona una imagen.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /* ---------- Guardar evento en Firebase ---------- */
  const subirOEditarEvento = async () => {
    if (!validarCampos()) return;

    try {
      setSubiendo(true);

      const fechaInicio = new Date(`${fecha}T${hora}`);
      const fechaFinal = fechaFin ? new Date(`${fechaFin}T${horaFin}`) : null;

      const eventoData = {
        titulo,
        descripcion,
        tipo: tipoEvento,
        fecha: Timestamp.fromDate(fechaInicio),
        fechaFin: fechaFinal ? Timestamp.fromDate(fechaFinal) : null,
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
      await cargarEventos(); // Refresca la lista
    } catch (error) {
      console.error("Error al guardar evento:", error);
      Alert.alert("Error", "No se pudo guardar el evento.");
    } finally {
      setSubiendo(false);
    }
  };

  /* ---------- Limpiar formulario ---------- */
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

  /* ---------- Editar evento ---------- */
  const seleccionarParaEditar = (evento) => {
    const fechaInicio = parseFecha(evento.fecha);
    const horaInicio = parseHora(evento.fecha);
    const fechaFinal = parseFecha(evento.fechaFin);
    const horaFinal = parseHora(evento.fechaFin);

    setTitulo(evento.titulo);
    setDescripcion(evento.descripcion);
    setFecha(fechaInicio);
    setHora(horaInicio);
    setFechaFin(fechaFinal);
    setHoraFin(horaFinal);
    setTipoEvento(evento.tipo || "seminario");
    setImagenB64(evento.imagenB64);
    setEditandoId(evento.id);
  };

  /* ---------- Eliminar evento ---------- */
  const eliminarEvento = async (id) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
      setMensajeTexto("Evento eliminado exitosamente");
      setMensajeVisible(true);
      setTimeout(() => setMensajeVisible(false), 2000);
      await cargarEventos();
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      setMensajeTexto("Hubo un problema al eliminar");
      setMensajeVisible(true);
      setTimeout(() => setMensajeVisible(false), 2000);
    }
  };

  /* ---------- Renderizar lista de eventos - Solo títulos, fechas e imágenes ---------- */
  const renderItem = ({ item }) => {
    const fechaInicio = parseFecha(item.fecha);
    const horaInicio = parseHora(item.fecha);
    const fechaFinal = parseFecha(item.fechaFin);
    const horaFinal = parseHora(item.fechaFin);

    return (
      <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{item.titulo}</Text>
        <Text style={styles.eventDate}>
          Inicio: {fechaInicio} - {horaInicio}
        </Text>
        {fechaFinal && (
          <Text style={styles.eventDate}>
            Fin: {fechaFinal} - {horaFinal}
          </Text>
        )}
        <TouchableOpacity onPress={() => verImagen(item)} style={styles.verImagenButton}>
          <Text style={styles.verImagenButtonText}>Ver imagen</Text>
        </TouchableOpacity>
      </View>
    );
  };

  /* ---------- Mostrar imagen completa ---------- */
  const verImagen = (evento) => {
    setImagenActual(evento.imagenB64);
    setImagenVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Campo: Título */}
      <Text style={styles.label}>{editandoId ? "Editar Evento" : "Nuevo Evento"}</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título del evento"
      />
      {errores.titulo && <Text style={styles.errorText}>{errores.titulo}</Text>}

      {/* Campo: Descripción */}
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del evento"
        multiline
      />
      {errores.descripcion && (
        <Text style={styles.errorText}>{errores.descripcion}</Text>
      )}

      {/* Fecha inicio y Hora inicio lado a lado */}
      <Text style={styles.label}>Fecha y hora de inicio *</Text>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.halfInput}
          value={fecha}
          onChangeText={setFecha}
          placeholder="Ej: 2024-10-10"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.halfInput}
          value={hora}
          onChangeText={setHora}
          placeholder="Ej: 15:00"
          keyboardType="numeric"
        />
      </View>
      {errores.fecha && <Text style={styles.errorText}>{errores.fecha}</Text>}
      {errores.hora && <Text style={styles.errorText}>{errores.hora}</Text>}

      {/* Fecha fin y Hora fin lado a lado */}
      <Text style={styles.label}>Fecha y hora de fin (opcional)</Text>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.halfInput}
          value={fechaFin}
          onChangeText={setFechaFin}
          placeholder="Ej: 2024-10-12"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.halfInput}
          value={horaFin}
          onChangeText={setHoraFin}
          placeholder="Ej: 17:00"
          keyboardType="numeric"
        />
      </View>
      {errores.fechaFin && <Text style={styles.errorText}>{errores.fechaFin}</Text>}
      {errores.horaFin && <Text style={styles.errorText}>{errores.horaFin}</Text>}

      {/* Tipo de evento */}
      <Text style={styles.label}>Tipo de evento:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipoEvento} onValueChange={setTipoEvento}>
          <Picker.Item label="Seminario" value="seminario" />
          <Picker.Item label="Curso" value="curso" />
          <Picker.Item label="Taller" value="taller" />
          <Picker.Item label="Feria" value="feria" />
          <Picker.Item label="Convocatoria" value="convocatoria" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>
      </View>

      {/* Botón: Seleccionar Imagen */}
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {errores.imagen && <Text style={styles.errorText}>{errores.imagen}</Text>}

      {/* Vista previa de imagen */}
      {imagenB64 && (
        <TouchableOpacity onPress={() => setImagenVisible(true)}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${imagenB64}` }}
            style={styles.imagePreview}
          />
        </TouchableOpacity>
      )}

      {/* Botón: Subir o editar evento */}
      <View style={{ marginTop: 20 }}>
        <Button
          title={subiendo ? "Guardando..." : editandoId ? "Guardar Cambios" : "Subir Evento"}
          onPress={subirOEditarEvento}
          disabled={subiendo}
        />
      </View>

      {/* Botón: Cancelar edición */}
      {editandoId && (
        <View style={{ marginTop: 10 }}>
          <Button title="Cancelar Edición" color="gray" onPress={limpiarFormulario} />
        </View>
      )}

      {/* Lista de eventos */}
      <Text style={[styles.label, { marginTop: 30 }]}>Eventos existentes:</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal: Ver imagen completa */}
      <Modal transparent visible={imagenVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setImagenVisible(false)}
          >
            <Text style={styles.modalCloseText}>✕ Cerrar</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${imagenB64}`,
            }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>

      {/* Modal: Mensaje de éxito/error */}
      <Modal transparent visible={mensajeVisible} animationType="fade">
        <View style={styles.mensajeModalContainer}>
          <View style={styles.mensajeBox}>
            <Text style={styles.mensajeTexto}>{mensajeTexto}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

/* ---------- Estilos optimizados para Android ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  halfInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginRight: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 15,
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
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 30,
  },
  mensajeModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  mensajeBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  mensajeTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "90%",
    height: "80%",
  },
  modalClose: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  verImagenButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  verImagenButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    marginBottom: 10,
  },
});