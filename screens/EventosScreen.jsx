
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ScrollView } from "react-native";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const { width } = Dimensions.get("window");

export const EventosScreen = () => {
  const [eventosRecientes, setEventosRecientes] = useState([]);
  const [eventosLista, setEventosLista] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const db = getFirestore();

        // Eventos más recientes (3)
        const qRecientes = query(collection(db, "eventos"), orderBy("fecha", "desc"), limit(3));
        const snapshotRecientes = await getDocs(qRecientes);
        const recientes = snapshotRecientes.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEventosRecientes(recientes);

        // Lista extendida (5 eventos siguientes)
        const qLista = query(collection(db, "eventos"), orderBy("fecha", "desc"), limit(8));
        const snapshotLista = await getDocs(qLista);
        const todos = snapshotLista.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Omitimos los 3 primeros (ya mostrados en la parte superior)
        setEventosLista(todos.slice(3));
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const renderEvento = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.titulo}</Text>
      <Text style={styles.eventDate}>
        {new Date(item.fecha.toDate()).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Carrusel horizontal estático */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {eventosRecientes.map((evento, index) => (
          <View key={evento.id} style={[styles.carouselItem, { width: width * 0.8 }]}>
            <Image source={{ uri: evento.imagenUrl }} style={styles.image} />
            <Text style={styles.carouselText}>{evento.titulo}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Lista cronológica */}
      <FlatList
        data={eventosLista}
        keyExtractor={(item) => item.id}
        renderItem={renderEvento}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  carouselText: {
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
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
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
});
