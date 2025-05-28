import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const AdminHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, gjgjgAdministrador</Text>
      {/* Aquí puedes añadir más opciones para el administrador */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
