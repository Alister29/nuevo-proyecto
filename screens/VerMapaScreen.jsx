import React, { useState, useRef } from "react";
import { View, ImageBackground, TouchableOpacity, Text, StyleSheet, Dimensions, TextInput, FlatList, Modal, Image, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");
const puntos = [
  { id: 1, nombre: "Bloque Central", x: 507, y: 264, descripcion: "Decanato, Direccion Academica, Kardex, Secretaria Administrativa, Dpt. Civil, Caja, CPD, CEF, CEIS, Gabinete y Auditorio Mecanica, PESEE, Planta baja-(Aula 651, Aula 652).", imagen: require("../assets/1.jpeg") },
  { id: 2, nombre: "Sala Docente", x: 455, y: 167, descripcion: "", imagen: require("../assets/2.jpeg") },
  { id: 3, nombre: "Instituto de Investigaciones", x: 444, y: 114, descripcion: "Sala HCF, Centro de Servicios.", imagen: require("../assets/3.jpeg") },
  { id: 4, nombre: "Departamento de Fisica", x: 525, y: 149, descripcion: "Planta baja-(618 Aula Lab. Fisica 1, 619 Aula Lab. Fisica 2, 619A Aula Lab. Fisica 3, 620 Aula Lab. Fisica 4, 620B Aula Lab. Fisica 5, 621 Aula Lab. Fisica 6, 621A Aula Lab. Fisica 7), FISCOM", imagen: require("../assets/4.jpeg") },
  { id: 5, nombre: "Centro de Aguas y Saneamiento Ambiental CASA", x: 602, y: 115, descripcion: "", imagen: require("../assets/5.jpeg") },
  { id: 6, nombre: "Centro de Alimentos y Productos Naturales CAPN", x: 616, y: 196, descripcion: "", imagen: require("../assets/6.jpeg") },
  { id: 7, nombre: "Departamento de Quimica", x: 626, y: 288, descripcion: "Planta baja-(613 Aula Lab. Quimica 1, 614 Aula Lab. Quimica 2, 615 Aula Lab. Quimica 3, 616 Aula Lab. Quimica 4), 616A Aula Lab. Quimica 5-1er piso", imagen: require("../assets/7.jpeg") },
  { id: 8, nombre: "Centros CTA", x: 594, y: 364, descripcion: "CBG/Biotecnologia", imagen: require("../assets/8.jpeg") },
  { id: 9, nombre: "Aula 607", x: 484, y: 329, descripcion: "Aula comun, CEB", imagen: require("../assets/9.jpeg") },
  { id: 10, nombre: "SCIAME, CEF", x: 446, y: 287, descripcion: "", imagen: require("../assets/10.jpeg") },
  { id: 11, nombre: "Aula 622", x: 437, y: 235, descripcion: "Aula comun", imagen: require("../assets/11.jpeg") },
  { id: 12, nombre: "Aula 617", x: 534, y: 201, descripcion: "Gabinete Fisica CE.Fis, 617B Aula comun-Planta baja, 617C Aula comun-Planta baja", imagen: require("../assets/12.jpeg") },
  { id: 13, nombre: "Aula 612", x: 583, y: 296, descripcion: "Aula comun, CEQA", imagen: require("../assets/13.jpeg") },
  { id: 14, nombre: "Departamento de Biologia", x: 497, y: 375, descripcion: "606 Aula Auditorio Biologia 1er piso, Planta baja-(608 Aula Lab. Biologia 2, 609 Aula Lab. Biologia 3, 608A Aula Lab. Biologia 4, 608B Aula Lab. Biologia 5, 609A Aula Lab. Biologia 6), ULRA", imagen: require("../assets/14.jpeg") },
  { id: 15, nombre: "Edificio Elektro", x: 406, y: 346, descripcion: "Planta baja(Aula lab. 667A Elektro 1, 667B Elektro 2, 668 Elektro 3), 1er Piso(Aula lab. 669A Elektro 4, 669B Elektro 5, 670 Elektro 6), 2do Piso 671B Aula proyectos,(Aula lab. 671 Elektro 7, 671A Elektro 8, 671C Elektro 10, 672 Elektro 11), 3er Piso(674A Aula Telecomunicaciones, 674B Aula Control, 675 Sala de Tesistas)", imagen: require("../assets/15.jpeg") },
  { id: 16, nombre: "Lab. Simulacion Metodos y Seguridad", x: 354, y: 272, descripcion: "", imagen: require("../assets/16.jpeg") },
  { id: 17, nombre: "Aula 624", x: 389, y: 271, descripcion: "Aula comun", imagen: require("../assets/17.jpeg") },
  { id: 18, nombre: "Aula 623", x: 382, y: 215, descripcion: "Aula comun, CEIME, CEMAT", imagen: require("../assets/18.jpeg") },
  { id: 19, nombre: "Biblioteca Fcyt-Planta baja y primer piso", x: 340, y: 115, descripcion: "625C aula comun-2do piso, 625D aula comun-2do piso, CAE", imagen: require("../assets/19.jpeg") },
  { id: 20, nombre: "Auditorio Facultativo", x: 381, y: 127, descripcion: "Palacio de la Ciencia y Cultura", imagen: require("../assets/20.jpeg") },
  { id: 21, nombre: "Area Abierta de Estudio 1", x: 381, y: 69, descripcion: "Lugar para estar al aire libre, estudiar o pasar el rato.", imagen: require("../assets/21.jpeg") },
  { id: 22, nombre: "Area Abierta de Estudio 2", x: 519, y: 67, descripcion: "Lugar para estar al aire libre, estudiar o pasar el rato.", imagen: require("../assets/22.jpeg") },
  { id: 23, nombre: "Planta de Tratamiento de Agua", x: 597, y: 50, descripcion: "", imagen: require("../assets/23.jpeg") },
  { id: 24, nombre: "Planta de Alimentos", x: 622, y: 241, descripcion: "", imagen: require("../assets/24.jpeg") },
  { id: 25, nombre: "Planta Agroquimica", x: 647, y: 347, descripcion: "", imagen: require("../assets/25.jpeg") },
  { id: 26, nombre: "Planta de Biogas", x: 535, y: 470, descripcion: "Biodigestor", imagen: require("../assets/26.jpeg") },
  { id: 27, nombre: "Laboratorio de Materiales", x: 513, y: 515, descripcion: "", imagen: require("../assets/27.jpeg") },
  { id: 28, nombre: "Edificio CAD-CAM", x: 448, y: 505, descripcion: "1er piso-(644 Aula comun, 644A Aula comun, PITA, Lab. refrigeracion, LENDSOL, ODE, Biblioteca Mecanica-Electromecanica, Gabinete y Auditorio Civil.)", imagen: require("../assets/28.jpeg") },
  { id: 29, nombre: "Lab. Automatizacion y Control Planta de Bioprocesos.", x: 400, y: 496, descripcion: "643 Aula-Lab. Automatizacion y Control Mecanica", imagen: require("../assets/34.jpeg") },
  { id: 30, nombre: "Parqueo Facultativo", x: 321, y: 313, descripcion: "", imagen: require("../assets/30.jpeg") },
  { id: 31, nombre: "Dep. Industrial", x: 306, y: 238, descripcion: "CEII, Planta baja-(631 Aula comun, 632 Aula comun)", imagen: require("../assets/31.jpeg") },
  { id: 32, nombre: "Complejo Deportivo", x: 773, y: 462, descripcion: "", imagen: require("../assets/32.jpeg") },
  { id: 33, nombre: "Lab. Maquinas Termicas", x: 405, y: 524, descripcion: "640 Aula-Lab. Maquinas Termicas Mecanica", imagen: require("../assets/34.jpeg") },
  { id: 34, nombre: "Aula 642", x: 360, y: 517, descripcion: "Aula comun", imagen: require("../assets/34.jpeg") },
  { id: 35, nombre: "CEInf", x: 140, y: 109, descripcion: "", imagen: require("../assets/35.jpeg") },
  { id: 36, nombre: "Planta de Amoniaco", x: 679, y: 460, descripcion: "", imagen: require("../assets/36.jpeg") },
  { id: 37, nombre: "Edificio de Lab. Basicos, Gab. CESA", x: 628, y: 530, descripcion: "Planta baja(Aula(680A, 680B, 680C), Lab. Quimica(680E, 680F, 680G, 680H, 680I), Lab. Civil(680J, 680K, 680L, 680M)), 1er piso(Aula(681A, 681B, 681C, 681D), Lab. Mec(681E, 681F, 681G, 681H), Lab Mat(681I, 681J, 681K, 681L)), 2do piso(Aula(682A, 682B, 682C, 682D), Lab. ELC(682E, 682F, 682G, 682H), Lab. IND(682I, 682J, 682K, 682L)), 3er piso(Aula(683A, 683B, 683C, 683D), Lab. Alim(683E, 683F, 683G, 683H), Lab. Bio(683I, 683J, 683K, 683L)), 4to piso(Aula(684A, 684B, 684C, 684D), Biblioteca, Lab. Herbario(684E, 684F, 684G), Lab. Fisica(684H, 684I, 684J, 684K))", imagen: require("../assets/37.jpeg") },
  { id: 38, nombre: "Edificio Academico 2", x: 539, y: 568, descripcion: "Planta baja(Aulas 690A, 690B, 690C, 690D), 1er piso(Aulas 691A, 691B, 691C, 691D, 691E, 691F), 2do piso(Aulas 692A, 692B, 692C, 692D, 692E, 692F, 692G, 692H), 3er piso(Aulas 693A, 693B, 693C, 693D), Auditorio 2", imagen: require("../assets/38.jpeg") },
  { id: 39, nombre: "Sala de Estudios de Ing. Civil", x: 459, y: 570, descripcion: "", imagen: require("../assets/39.jpeg") },
  { id: 40, nombre: "Planta de Procesos Industriales", x: 420, y: 559, descripcion: "635 Aula 1er piso", imagen: require("../assets/40.jpeg") },
  { id: 41, nombre: "MEMI", x: 99, y: 263, descripcion: "Dep. Matematicas, Lab.inf-sis", imagen: require("../assets/41.jpeg") },
  { id: 42, nombre: "Posgrado FCyT", x: 87, y: 223, descripcion: "", imagen: require("../assets/42.jpeg") },
  { id: 43, nombre: "Dep. Informatica y Sistemas", x: 76, y: 185, descripcion: "Lab.inf-sis", imagen: require("../assets/43.jpeg") },
  { id: 44, nombre: "Sub. Estacion de Potencia", x: 687, y: 525, descripcion: "", imagen: require("../assets/44.jpeg") },
  { id: 45, nombre: "Dep. Mantenimiento", x: 427, y: 592, descripcion: "", imagen: require("../assets/45.jpeg") },
  { id: 46, nombre: "Dep. Infraestructura", x: 351, y: 595, descripcion: "", imagen: require("../assets/46.jpeg") },
  { id: 47, nombre: "Cancha de futbol", x: 824, y: 238, descripcion: "", imagen: require("../assets/47.jpeg") },
  { id: 48, nombre: "Canchas polifuncionales", x: 678, y: 250, descripcion: "", imagen: require("../assets/48.jpeg") },
  { id: 49, nombre: "Aulas 660 y 661", x: 247, y: 337, descripcion: "", imagen: require("../assets/49.jpeg") },
];
export const VerMapaScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [puntoSeleccionado, setPuntoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [zoom, setZoom] = useState(1);

  const scrollRefX = useRef(null);
  const scrollRefY = useRef(null);

  // Buscar lugar
  const buscarLugar = (texto) => {
    setBusqueda(texto);
    if (!texto.trim()) return setResultados([]);
    const textoNormalizado = texto.toLowerCase();
    const coincidencias = puntos.filter(punto =>
      punto.nombre.toLowerCase().includes(textoNormalizado) ||
      punto.descripcion.toLowerCase().includes(textoNormalizado)
    );
    setResultados(coincidencias);
  };
 
  // Centrar punto
  const centrarPunto = (punto) => {
    setPuntoSeleccionado(punto);
    setModalVisible(true);

    // Centra el mapa horizontalmente (X)
    if (scrollRefX.current) {
      scrollRefX.current.scrollTo({
        x: Math.max(punto.x - width / 2, 0),
        animated: true,
      });
    }

    // Centra el mapa verticalmente (Y)
    if (scrollRefY.current) {
      scrollRefY.current.scrollTo({
        y: Math.max(punto.y - height / 2, 0),
        animated: true,
      });
    }
  };

  const aumentarZoom = () => setZoom((z) => Math.min(z + 0.2, 2.5));
  const disminuirZoom = () => setZoom((z) => Math.max(z - 0.2, 1));

  return (
    <View style={styles.contenedor}>
      {/* Modal de información */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{puntoSeleccionado?.nombre}</Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Image
                source={puntoSeleccionado?.imagen}
                style={styles.modalImage}
              />
            </View>
            <Text style={styles.modalDescription}>{puntoSeleccionado?.descripcion}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Barra de búsqueda */}
      <TextInput style={styles.inputBusqueda} placeholder="Buscar..." value={busqueda} onChangeText={buscarLugar} />
      {/* Lista de resultados de búsqueda */}
      {resultados.length > 0 && (
        <FlatList data={resultados} keyExtractor={(item) => item.id.toString()} style={styles.listaResultados}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => centrarPunto(item)}>
              <Text style={styles.resultadoTexto}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Contenedor con desplazamiento */}
      <ScrollView ref={scrollRefX} horizontal={true} contentContainerStyle={styles.scrollContainer}>
        <ScrollView ref={scrollRefY}>
          <View style={[styles.fondo, { transform: [{ scale: zoom }] }]}>
            <ImageBackground source={require("../assets/MapaUni2d.png")} style={styles.fondo}>
              {puntos.map((punto) => (
                <TouchableOpacity
                  key={punto.id}
                  style={[
                    styles.marcador,
                    { left: punto.x, top: punto.y },
                    puntoSeleccionado?.id === punto.id && { borderWidth: 3, borderColor: "red" }
                  ]}
                  onPress={() => centrarPunto(punto)}
                />
              ))}
            </ImageBackground>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Botones de zoom */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={aumentarZoom}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={disminuirZoom}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 10 },
  fondo: { width: 1200, height: 650 },
  marcador: { position: "absolute", width: 20, height: 20, backgroundColor: "blue", borderRadius: 10 },
  inputBusqueda: { height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
  listaResultados: { backgroundColor: "#fff", padding: 5, borderRadius: 5, maxHeight: 150 },
  resultadoTexto: { padding: 10, fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: width * 0.85,
    maxHeight: height * 0.8,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalImage: {
    width: width * 0.75,
    height: (width * 0.75) * (7 / 16),
    resizeMode: "contain",
    borderRadius: 10,
    marginVertical: 10,
  },
  modalDescription: { marginTop: 10 },
  modalClose: { marginTop: 20, alignSelf: "center", padding: 10, backgroundColor: "#ddd", borderRadius: 5 },
  zoomControls: {
    position: "absolute",
    bottom: 30,
    right: 30,
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    padding: 5,
    elevation: 5,
  },
  zoomButton: {
    padding: 10,
    alignItems: "center",
  },
  zoomText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
