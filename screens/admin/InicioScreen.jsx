import React from "react";
import { View, StyleSheet } from "react-native";

import { TarjetaInicio } from "../../components";
import { ROUTES } from "../../navigation/routes";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "50%",
    paddingVertical:5,
  },
});

export const InicioScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TarjetaInicio
          titulo={"Eventos"}
          icono={"calendar-clear-outline"}
          detalle={"Subir Eventos"}
          onPress={() => {navigation.navigate(ROUTES.ADMIN_SUBIR_EVENTOS)}}
        />
      </View>
      <View style={styles.item}>
        <TarjetaInicio
          titulo={"Horarios"}
          icono={"time-outline"}
          detalle={"Subir Horarios"}
          onPress={() => {navigation.navigate(ROUTES.ADMIN_SUBIR_HORARIOS)}}
        />
      </View>
      <View style={styles.item}>
        <TarjetaInicio
          titulo={"Documentos"}
          icono={"folder-outline"}
          detalle={"Aprobar Documentos"}
          onPress={() => {navigation.navigate(ROUTES.ADMIN_APROBAR_DOCUMENTOS)}}
        />
      </View>
    </View>
  );
};
