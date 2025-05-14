import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const { width } = Dimensions.get("window");

export const EventosScreen = () => {
  const [eventosRecientes, setEventosRecientes] = useState([]);
  const [eventosLista, setEventosLista] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, "eventos"), orderBy("fecha", "desc"), limit(20));
        const snapshot = await getDocs(q);
        const eventos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEventosRecientes(eventos.slice(0, 3));
        setEventosLista(eventos.slice(3));
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const filtrarPorTipo = (eventos) => {
    if (tipoSeleccionado === "todos") return eventos;
    return eventos.filter((e) => e.tipo === tipoSeleccionado);
  };

  const renderEvento = ({ item }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eventTitle}>{item.titulo || "Sin título"}</Text>
          <Text style={styles.eventDescription}>
            {item.descripcion ? item.descripcion : "Sin descripción disponible"}
          </Text>
          <Text style={styles.eventDate}>
            {item.fecha && item.fecha.toDate
              ? new Date(item.fecha.toDate()).toLocaleString()
              : "Sin fecha"}
          </Text>
        </View>

        {item.imagenB64 && (
          <TouchableOpacity
            onPress={() => setSelectedImage(item.imagenB64)}
            style={styles.viewImageButton}
          >
            <Text style={styles.viewImageText}>Ver imagen</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filtro */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Tipo de evento:</Text>
        <Picker
          selectedValue={tipoSeleccionado}
          onValueChange={(itemValue) => setTipoSeleccionado(itemValue)}
        >
          <Picker.Item label="Todos" value="todos" />
          <Picker.Item label="Seminario" value="seminario" />
          <Picker.Item label="Curso" value="curso" />
          <Picker.Item label="Taller" value="taller" />
          <Picker.Item label="Feria" value="feria" />
        </Picker>
      </View>

      {/* Carrusel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {filtrarPorTipo(eventosRecientes).map((evento) => (
          <TouchableOpacity
            key={evento.id}
            onPress={() => setSelectedImage(evento.imagenB64)}
            style={[styles.carouselItem, { width: width * 0.8 }]}
          >
            <Image
              source={{ uri: `data:image/jpeg;base64,${evento.imagenB64}` }}
              style={styles.image}
            />
            <View style={styles.carouselTextContainer}>
              <Text style={styles.carouselTitle}>{evento.titulo || "Sin título"}</Text>
              <Text style={styles.carouselDescription}>
                {evento.descripcion || "Sin descripción disponible"}
              </Text>
              <Text style={styles.carouselDate}>
                {evento.fecha && evento.fecha.toDate
                  ? new Date(evento.fecha.toDate()).toLocaleString()
                  : "Sin fecha"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de eventos */}
      <FlatList
        data={filtrarPorTipo(eventosLista)}
        keyExtractor={(item) => item.id}
        renderItem={renderEvento}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal de imagen */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
            style={styles.fullImage}
            resizeMode="contain"
          />
          <Pressable onPress={() => setSelectedImage(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontWeight: "bold",
    padding: 5,
  },
  carousel: {
    paddingVertical: 10,
    paddingLeft: 16,
  },
  carouselItem: {
    marginRight: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    height: 180,
    width: "100%",
    resizeMode: "cover",
  },
  carouselTextContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  carouselTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  carouselDescription: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  carouselDate: {
    fontSize: 13,
    color: "#666",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  eventItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  eventContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
  eventDescription: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  viewImageButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  viewImageText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "80%",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  closeButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
});
