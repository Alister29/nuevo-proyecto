import React, { useContext } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { TarjetaProgreso } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: { display: "flex", flexDirection: "row" },
});

export const ProgresoScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView horizontal>
          <View style={styles.row}>
            <TarjetaProgreso />
            <TarjetaProgreso />
          </View>
          <View style={styles.row}>
            <TarjetaProgreso />
            <TarjetaProgreso />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
