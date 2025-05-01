import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
});

export const InicioScreen = () => {
  return (
    <View>
      <Pressable style={styles.card}>
        <Text>Hola</Text>
      </Pressable>
    </View>
  );
};
