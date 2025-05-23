import React, { useContext } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    alignItems: "center",
    paddingVertical:10,
  },
  icon: {
    marginVertical: 5,
  },
  title: {
    height: 40,
    width: 140,
    textAlign: "center",
    textAlignVertical: "center",
  },
  detail: {
    height: 40,
    width: 130,
    textAlign: "center",
    textAlignVertical: "center",
  }
});

export const TarjetaInicio = ({ titulo, icono, detalle, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{titulo}</Text>
      <Ionicons name={icono} size={40} color={"black"} style={styles.icon} />
      <Text style={styles.detail}>{detalle}</Text>
    </Pressable>
  );
};
