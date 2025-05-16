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
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

export const EventosScreen = () => {
  const [eventosRecientes, setEventosRecientes] = useState([]);
  const [eventosLista, setEventosLista] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");
  const [imagenVisible, setImagenVisible] = useState(false);
  const [imagenActual, setImagenActual] = useState(null);

  const [eventoExpandidoCarruselId, setEventoExpandidoCarruselId] = useState(null);
  const [expandidoId, setExpandidoId] = useState(null); // Para la lista

  useEffect(() => {
  const fetchEventos = async () => {
    try {
      const db = getFirestore();
      const q = query(
        collection(db, "eventos"),
        orderBy("fecha", "desc"),
        limit(20)
      );
      const snapshot = await getDocs(q);
      const eventos = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // FILTRAR SOLO EVENTOS CON FECHA DE INICIO HOY O POSTERIOR
        .filter(evento => {
          if (!evento.fecha?.toDate) return false; // Excluir si no tiene fechaInicio válida
          const fecha = new Date(evento.fecha.toDate());
          const hoy = new Date();
          // Poner hora a 0 para comparar solo fecha (sin hora)
          hoy.setHours(0,0,0,0);
          fecha.setHours(0,0,0,0);
          return fecha >= hoy;
        });

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

  const verImagen = (evento) => {
    setImagenActual(evento.imagenB64);
    setImagenVisible(true);
  };

  const renderEvento = ({ item }) => {
    const expandido = expandidoId === item.id;

    return (
      <TouchableOpacity
        style={styles.eventItem}
        onPress={() =>
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut) ||
          setExpandidoId(expandido ? null : item.id)
        }
      >
        <View style={styles.headerRow}>
          <Text style={styles.eventTitle}>{item.titulo || "Sin título"}</Text>
        </View>

        {!expandido && <Text style={styles.verMasHint}>Presione para ver más</Text>}

        {expandido && (
          <View style={styles.expandedBox}>
            <Text style={styles.eventDescription}>
              {item.descripcion || "Sin descripción"}
            </Text>

            <View style={styles.infoRow}>
              <View style={styles.infoColumnLeft}>
                <Text style={styles.eventDate}>
                  📅 Inicio:{" "}
                  {item.fecha?.toDate
                    ? new Date(item.fecha.toDate()).toLocaleDateString()
                    : "—"}
                </Text>
              </View>
              <View style={styles.infoColumnRight}>
                <Text style={styles.eventDate}>
                  📅 Fin:{" "}
                  {item.fechaFin?.toDate
                    ? new Date(item.fechaFin.toDate()).toLocaleDateString()
                    : "—"}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoColumnLeft}>
                <Text style={styles.eventDate}>
                   🕒 Inicio:
                    {item.hora?.toDate
                    ? new Date(item.hora.toDate()).toLocaleTimeString()
                    : "—"}

                  </Text>
              </View>
              <View 
              style={styles.infoColumnRight}>
                <Text style={styles.eventDate}>
                    🕒 Fin:{" "}
                    {item.horaFin?.toDate
                      ? new Date(item.horaFin.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : "—"}
                  </Text> 
              </View>
            </View>

            {item.imagenB64 && (
              <TouchableOpacity
                onPress={() => verImagen(item)}
                style={[styles.verImagenButton, { marginTop: 10 }]}
              >
                <Text style={styles.verImagenButtonText}>Ver imagen</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* Modal para imagen */}
      <Modal visible={imagenVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalOverlay} onPress={() => setImagenVisible(false)} />
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setImagenVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            {imagenActual && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${imagenActual}` }}
                style={styles.modalImage}
              />
            )}
          </View>
        </View>
      </Modal>

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
            <Picker.Item label="Convocatoria" value="convocatoria" />
            <Picker.Item label="Otro" value="Otro" />
          </Picker>
        </View>

        {/* Carrusel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {filtrarPorTipo(eventosRecientes).map((evento) => (
            <View key={evento.id} style={styles.carouselItemContainer}>
              <View style={[styles.carouselItem, { width: width * 0.5 }]}>
                {evento.imagenB64 && (
                  <TouchableOpacity onPress={() => verImagen(evento)}>
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${evento.imagenB64}` }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                )}

                <View style={styles.carouselTextContainer}>
                  <View style={styles.titleRow}>
                    <TouchableOpacity
                      onPress={() =>
                        setEventoExpandidoCarruselId(
                          eventoExpandidoCarruselId === evento.id ? null : evento.id
                        )
                      }
                      style={styles.expandButtonLeft}
                    >
                      <Text style={styles.expandButtonText}>
                        {eventoExpandidoCarruselId === evento.id ? "Ver menos" : "Ver más"}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.carouselTitle}>
                      {evento.titulo || "Sin título"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Cuadro separado con información expandida del carrusel */}
        {eventoExpandidoCarruselId && (
          <View style={styles.expandedInfoContainer}>
            {(() => {
              const evento = eventosRecientes.find(e => e.id === eventoExpandidoCarruselId);
              if (!evento) return null;

              return (
                <>
                  <Text style={styles.expandedTitle}>{evento.titulo || "Sin título"}</Text>
                  <Text style={styles.expandedDescription}>{evento.descripcion || "Sin descripción"}</Text>

                  <View style={styles.infoRow}>
                    <View style={styles.infoColumnLeft}>
                      <Text style={styles.eventDate}>
                        📅 Inicio:{" "}
                        {evento.fecha?.toDate
                          ? new Date(evento.fecha.toDate()).toLocaleDateString()
                          : "—"}
                      </Text>
                    </View>
                    <View style={styles.infoColumnRight}>
                      <Text style={styles.eventDate}>
                        📅 Fin:{" "}
                        {evento.fechaFin?.toDate
                          ? new Date(evento.fechaFin.toDate()).toLocaleDateString()
                          : "—"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <View style={styles.infoColumnLeft}>
                      <Text style={styles.eventDate}>
                          🕒 Inicio:{" "}
                          {evento.hora?.toDate
                            ? new Date(evento.hora.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : "—"}
                        </Text>

                    </View>
                    <View style={styles.infoColumnRight}>
                     <Text style={styles.eventDate}>
                          🕒 Fin:{" "}
                          {evento.horaFin?.toDate
                            ? new Date(evento.horaFin.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : "—"}
                      </Text>

                    </View>
                  </View>
                </>
              );
            })()}
          </View>
        )}

        {/* Lista de eventos */}
        <FlatList
          data={filtrarPorTipo(eventosLista)}
          keyExtractor={(item) => item.id}
          renderItem={renderEvento}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
};

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
  carouselItemContainer: {
    marginRight: 16,
  },
  carouselItem: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 280,
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carouselTextContainer: {
    padding: 10,
  },
  carouselTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
    flex: 1,
    marginLeft: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  expandButtonLeft: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#2a7bf6",
    borderRadius: 6,
  },
  expandButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  eventItem: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
    flex: 1,
  },
  eventDate: {
    marginTop: 6,
    color: "#555",
  },
  expandedBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  infoColumnLeft: {
    flex: 1,
  },
  infoColumnRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  verImagenButton: {
    backgroundColor: "#2a7bf6",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  verImagenButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  eventDescription: {
    marginBottom: 6,
color: "#444",
},
modalContainer: {
flex: 1,
backgroundColor: "rgba(0,0,0,0.6)",
justifyContent: "center",
alignItems: "center",
},
modalOverlay: {
...StyleSheet.absoluteFillObject,
},
modalContent: {
backgroundColor: "#fff",
borderRadius: 10,
padding: 10,
maxWidth: "90%",
maxHeight: "80%",
},
modalImage: {
width: 300,
height: 300,
resizeMode: "contain",
borderRadius: 8,
},
closeButton: {
alignSelf: "flex-end",
padding: 6,
marginBottom: 10,
backgroundColor: "#2a7bf6",
borderRadius: 6,
},
closeButtonText: {
color: "#fff",
fontWeight: "bold",
},
expandedInfoContainer: {
backgroundColor: "#e6f0ff",
marginHorizontal: 16,
marginBottom: 12,
padding: 12,
borderRadius: 10,
},
expandedTitle: {
fontWeight: "bold",
fontSize: 17,
marginBottom: 8,
},
expandedDescription: {
fontSize: 15,
marginBottom: 8,
color: "#333",
},
verMasHint: {
fontStyle: "italic",
color: "#666",
marginTop: 4,
},
});