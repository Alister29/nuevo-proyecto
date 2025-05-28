import React from "react";
import { View, StyleSheet } from "react-native";

import { TarjetaInicio } from "../components";
import { ROUTES } from "../navigation/routes";

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
          titulo={"Horario"}
          icono={"time-outline"}
          detalle={"0 Materias este semestre"}
          onPress={() => {navigation.navigate(ROUTES.HORARIO)}}
        />
      </View>
      <View style={styles.item}>
        <TarjetaInicio
          titulo={"Progreso Académico"}
          icono={"bookmark-outline"}
          detalle={"0/0 Materias vencidas"}
          onPress={() => {navigation.navigate(ROUTES.PROGRESO_ACADEMICO)}}
        />
      </View>
      <View style={styles.item}>
        <TarjetaInicio
          titulo={"Eventos"}
          icono={"calendar-clear-outline"}
          detalle={"0 Eventos nuevos"}
          onPress={() => {navigation.navigate(ROUTES.EVENTOS)}}
        />
      </View>
      <View style={styles.item}>
        <TarjetaInicio
          titulo={"Mapa"}
          icono={"location-outline"}
          detalle={"Consultar"}
          onPress={() => {navigation.navigate(ROUTES.MAPA)}}
        />
      </View>
    </View>
  );
};
