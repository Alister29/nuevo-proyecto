import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView, Modal } from "react-native";

const puntos = [
  { id: 1, nombre: "Bloque Central", x: 335, y: 255, descripcion: "Decanato, Direccion Academica, Kardex, Secretaria Administrativa, Dpt. Civil, Caja, CPD, CEF, CEIS, Gabinete y Auditorio Mecanica, PESEE, Planta baja-(Aula 651, Aula 652).", imagen: require("../assets/icon.png") },
  { id: 2, nombre: "Sala Docente", x: 300, y: 190, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 3, nombre: "Instituto de Investigaciones", x: 290, y: 156, descripcion: "Sala HCF, Centro de Servicios.", imagen: require("../assets/icon.png") },
  { id: 4, nombre: "Departamento de Fisica", x: 345, y: 180, descripcion: "Planta baja-(618 Aula Lab. Fisica 1, 619 Aula Lab. Fisica 2, 619A Aula Lab. Fisica 3, 620 Aula Lab. Fisica 4, 620B Aula Lab. Fisica 5, 621 Aula Lab. Fisica 6, 621A Aula Lab. Fisica 7), FISCOM", imagen: require("../assets/icon.png") },
  { id: 5, nombre: "Centro de Aguas y Saneamiento Ambiental CASA", x: 395, y: 155, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 6, nombre: "Centro de Alimentos y Productos Naturales CAPN", x: 405, y: 210, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 7, nombre: "Departamento de Quimica", x: 415, y: 273, descripcion: "Planta baja-(613 Aula Lab. Quimica 1, 614 Aula Lab. Quimica 2, 615 Aula Lab. Quimica 3, 616 Aula Lab. Quimica 4), 616A Aula Lab. Quimica 5-1er piso", imagen: require("../assets/icon.png") },
  { id: 8, nombre: "Centros CTA", x: 390, y: 320, descripcion: "CBG/Biotecnologia", imagen: require("../assets/icon.png") },
  { id: 9, nombre: "Aula 607", x: 320, y: 300, descripcion: "Aula comun, CEB", imagen: require("../assets/icon.png") },
  { id: 10, nombre: "SCIAME, CEF", x: 295, y: 275, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 11, nombre: "Aula 622", x: 290, y: 238, descripcion: "Aula comun", imagen: require("../assets/icon.png") },
  { id: 12, nombre: "Aula 617", x: 350, y: 215, descripcion: "Gabinete Fisica CE.Fis, 617B Aula comun-Planta baja, 617C Aula comun-Planta baja", imagen: require("../assets/icon.png") },
  { id: 13, nombre: "Aula 612", x: 385, y: 280, descripcion: "Aula comun, CEQA", imagen: require("../assets/icon.png") },
  { id: 14, nombre: "Departamento de Biologia", x: 330, y: 330, descripcion: "606 Aula Auditorio Biologia 1er piso, Planta baja-(608 Aula Lab. Biologia 2, 609 Aula Lab. Biologia 3, 608A Aula Lab. Biologia 4, 608B Aula Lab. Biologia 5, 609A Aula Lab. Biologia 6), ULRA", imagen: require("../assets/icon.png") },
  { id: 15, nombre: "Edificio Elektro", x: 268, y: 312, descripcion: "Planta baja(Aula lab. 667A Elektro 1, 667B Elektro 2, 668 Elektro 3), 1er Piso(Aula lab. 669A Elektro 4, 669B Elektro 5, 670 Elektro 6), 2do Piso 671B Aula proyectos,(Aula lab. 671 Elektro 7, 671A Elektro 8, 671C Elektro 10, 672 Elektro 11), 3er Piso(674A Aula Telecomunicaciones, 674B Aula Control, 675 Sala de Tesistas)", imagen: require("../assets/icon.png") },
  { id: 16, nombre: "Lab. Simulacion Metodos y Seguridad", x: 232, y: 263, descripcion: "Dpt. de Electrica y Electronica", imagen: require("../assets/icon.png") },
  { id: 17, nombre: "Aula 624", x: 258, y: 261, descripcion: "Aula comun", imagen: require("../assets/icon.png") },
  { id: 18, nombre: "Aula 623", x: 250, y: 225, descripcion: "Aula comun, CEIME, CEMAT", imagen: require("../assets/icon.png") },
  { id: 19, nombre: "Biblioteca Fcyt-Planta baja y primer piso", x: 222, y: 155, descripcion: "625C aula comun-2do piso, 625D aula comun-2do piso, CAE", imagen: require("../assets/icon.png") },
  { id: 20, nombre: "Auditorio Facultativo", x: 254, y: 164, descripcion: "Palacio de la Ciencia y Cultura", imagen: require("../assets/icon.png") },
  { id: 21, nombre: "Area Abierta de Estudio 1", x: 250, y: 128, descripcion: "Lugar para estar al aire libre, estudiar o pasar el rato.", imagen: require("../assets/icon.png") },
  { id: 22, nombre: "Area Abierta de Estudio 2", x: 345, y: 124, descripcion: "Lugar para estar al aire libre, estudiar o pasar el rato.", imagen: require("../assets/icon.png") },
  { id: 23, nombre: "Planta de Tratamiento de Agua", x: 395, y: 115, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 24, nombre: "Planta de Alimentos", x: 410, y: 240, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 25, nombre: "Planta Agroquimica", x: 430, y: 312, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 26, nombre: "Planta de Biogas", x: 354, y: 395, descripcion: "Biodigestor", imagen: require("../assets/icon.png") },
  { id: 27, nombre: "Laboratorio de Materiales", x: 338, y: 425, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 28, nombre: "Edificio CAD-CAM", x: 296, y: 418, descripcion: "1er piso-(644 Aula comun, 644A Aula comun, PITA, Lab. refrigeracion, LENDSOL, ODE, Biblioteca Mecanica-Electromecanica, Gabinete y Auditorio Civil.)", imagen: require("../assets/icon.png") },
  { id: 29, nombre: "Lab. Automatizacion y Control Planta de Bioprocesos.", x: 263, y: 410, descripcion: "643 Aula-Lab. Automatizacion y Control Mecanica", imagen: require("../assets/icon.png") },
  { id: 30, nombre: "Parqueo Facultativo", x: 210, y: 290, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 31, nombre: "Dep. Industrial", x: 200, y: 239, descripcion: "CEII, Planta baja-(631 Aula comun, 632 Aula comun)", imagen: require("../assets/icon.png") },
  { id: 32, nombre: "Complejo Deportivo", x: 513, y: 390, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 33, nombre: "Lab. Maquinas Termicas", x: 267, y: 432, descripcion: "640 Aula-Lab. Maquinas Termicas Mecanica", imagen: require("../assets/icon.png") },
  { id: 34, nombre: "Aula 642", x: 238, y: 426, descripcion: "Aula comun", imagen: require("../assets/icon.png") },
  { id: 35, nombre: "CEInf", x: 89, y: 154, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 36, nombre: "Planta de Amoniaco", x: 450, y: 390, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 37, nombre: "Edificio de Lab. Basicos, Gab. CESA", x: 415, y: 435, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 38, nombre: "Edificio Academico 2", x: 357, y: 458, descripcion: "Planta baja(Aulas 690A, 690B, 690C, 690D), 1er piso(Aulas 691A, 691B, 691C, 691D, 691E, 691F), 2do piso(Aulas 692A, 692B, 692C, 692D, 692E, 692F, 692G, 692H), 3er piso(Aulas 693A, 693B, 693C, 693D), Auditorio 2", imagen: require("../assets/icon.png") },
  { id: 39, nombre: "Sala de Estudios de Ing. Civil", x: 305, y: 462, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 40, nombre: "Planta de Procesos Industriales", x: 277, y: 453, descripcion: "635 Aula 1er piso", imagen: require("../assets/icon.png") },
  { id: 41, nombre: "MEMI", x: 63, y: 255, descripcion: "Dep. Matematicas, Lab.inf-sis", imagen: require("../assets/icon.png") },
  { id: 42, nombre: "Posgrado FCyT", x: 53, y: 230, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 43, nombre: "Dep. Informatica y Sistemas", x: 48, y: 205, descripcion: "Lab.inf-sis", imagen: require("../assets/icon.png") },
  { id: 44, nombre: "Sub. Estacion de Potencia", x: 457, y: 430, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 45, nombre: "Dep. Mantenimiento", x: 282, y: 477, descripcion: "", imagen: require("../assets/icon.png") },
  { id: 46, nombre: "Dep. Infraestructura", x: 231, y: 477, descripcion: "", imagen: require("../assets/icon.png") }
];

const VerMapaScreen = () => {
  const [info, setInfo] = useState(null);

  return (
    <View style={styles.contenedor}>
      <ScrollView horizontal={true} vertical={true} contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/MapaUni2d.png")} style={styles.mapa} />
        {puntos.map((punto) => (
          <TouchableOpacity
            key={punto.id}
            style={[styles.marcador, { left: punto.x, top: punto.y }]}
            onPress={() => setInfo(punto)}
          />
        ))}
      </ScrollView>

      {/* Modal para mostrar detalles del punto seleccionado */}
      <Modal visible={!!info} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.titulo}>{info?.nombre}</Text>
          <Image source={info?.imagen} style={styles.imagenLugar} />
          <Text style={styles.descripcion}>{info?.descripcion}</Text>
          <TouchableOpacity onPress={() => setInfo(null)} style={styles.cerrar}>
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1 },
  scrollContainer: { flexDirection: "column", alignItems: "center" },
  mapa: {
    width: 800, // Tamaño original
    height: 600,
    resizeMode: "contain",
  },
  marcador: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titulo: { fontSize: 20, fontWeight: "bold" },
  imagenLugar: { width: "100%", height: 150, resizeMode: "cover" },
  descripcion: { marginTop: 10 },
  cerrar: { marginTop: 20, alignSelf: "center", padding: 10, backgroundColor: "#ddd", borderRadius: 5 },
});

export default VerMapaScreen;

