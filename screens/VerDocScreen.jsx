import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import * as WebBrowser from "expo-web-browser";
import { db, storage } from "../database/firebaseConfig"; // Asegúrate de que esta ruta sea correcta

export const VerDocScreen = () => {
  const [documentos, setDocumentos] = useState([]);

  const obtenerDocumentos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "documentos"));
      const docsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const url = await getDownloadURL(ref(storage, data.storagePath));
          return {
            id: doc.id,
            titulo: data.titulo,
            materia: data.materia,
            categoria: data.categoria,
            nombreArchivo: data.nombreArchivo,
            url,
          };
        })
      );
      setDocumentos(docsData);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  const abrirDocumento = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  useEffect(() => {
    obtenerDocumentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Documentos Subidos</Text>
      <FlatList
        data={documentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.detalle}>📘 Materia: {item.materia}</Text>
            <Text style={styles.detalle}>📂 Categoría: {item.categoria}</Text>
            <Text style={styles.detalle}>📄 Archivo: {item.nombreArchivo}</Text>
            <TouchableOpacity
              onPress={() => abrirDocumento(item.url)}
              style={styles.botonVer}
            >
              <Text style={styles.botonVerTexto}>🔍 Ver documento</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  detalle: {
    fontSize: 14,
    marginBottom: 4,
  },
  botonVer: {
    backgroundColor: "#49b8ff",
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
    alignItems: "center",
  },
  botonVerTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
