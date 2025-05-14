import React, { useContext } from "react";
import { Pressable, Text, StyleSheet, Alert } from "react-native";

import { UserContext, ThemeContext } from "../context";

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
  },
});

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

export const TarjetaProgreso = ({ dat, navigation, onLongPress }) => {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <Pressable
      style={styles.container}
      onLongPress={() => {
        Alert.alert("Long Pressed");
      }}
    >
      <Text numberOfLines={1} ellipsizeMode="tail">
        {data[3].materia}
      </Text>
      <Text>{data[3].codigo}</Text>;
      {data[2].prereq.split(",").map((r, i) => (
        <Text key={`${data[2]}-${data[2].prereq}-${i}`}>{r}</Text>
      ))}
    </Pressable>
  );
};
