import React, { useContext } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { TarjetaMateria, BarraProgreso } from "../components";


const data = [
  {
    nivel: "A",
    codigo: "1803001",
    materia: "Ingles I",
    tipo: "Regular",
    electiva: "No",
    prereq: "-",
  },
  {
    nivel: "A",
    codigo: "2010010",
    materia: "Introduccion a la Programación",
    tipo: "Regular",
    electiva: "No",
    prereq: "-",
  },
  {
    nivel: "A",
    codigo: "2010140",
    materia: "Metodologia Invertigacion y Tec Comunicación",
    tipo: "Regular",
    electiva: "No",
    prereq: "-",
  },
  {
    nivel: "B",
    codigo: "1803001",
    materia: "Elem. de Programación y Estruc. de Datos",
    tipo: "Regular",
    electiva: "No",
    prereq: "2010010, 2010140",
  },
];

const styles = StyleSheet.create({
  page:{
    padding: 10,
  },
  container: {
    flex: 1,
  },
  list:{
    display: "flex",
    gap: 10,
  },
  entry: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export const ProgresoScreen = () => {
  return (
    <View style={styles.page}>
      <Text>Carrera:{"Ing. de Sistemas"}</Text>
      <BarraProgreso progreso={5} total={55} />
      <ScrollView horizontal>
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          <View style={styles.entry}>
            <Text>Nivel A</Text>
            <TarjetaMateria data={data[0]} done={true} />
            <TarjetaMateria data={data[1]} done={false} />
          </View>
        </View>
      </ScrollView>
    </ScrollView>
    </View>
  );
};
