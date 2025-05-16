import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ThemeContext } from "../context";

const styles = StyleSheet.create({
  barraBase: {
    height: 24,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },
  barraProgreso: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  textoEnBarra: {
    alignItems: "center",
  },
  textoPorcentaje: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export const BarraProgreso = ({ progreso, total }) => {
  const { theme } = useContext(ThemeContext);
  let percDec = progreso && total ? progreso / total : 0;
  if (percDec > 1) percDec = 1;
  const porcentaje = `${Math.round(percDec * 100)}%`;

  return (
    <View style={[styles.barraBase, { backgroundColor: theme.secondary }]}>
      <View
        style={[
          styles.barraProgreso,
          { width: `${porcentaje}`, backgroundColor: theme.primary },
        ]}
      />
      <View style={styles.textoEnBarra}>
        <Text style={styles.textoPorcentaje}>{porcentaje}</Text>
      </View>
    </View>
  );
};
