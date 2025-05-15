import React, { useContext } from "react";
import { Pressable, Text, StyleSheet, Alert } from "react-native";

import { ThemeContext } from "../context";

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    width: "120",
    height: "75",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 10,
  },
});

export const TarjetaMateria = ({ data, done, onLongPress }) => {
  const { theme } = useContext(ThemeContext);

  const { materia, codigo, prereq } = data;

  const customStyle = { ...styles.container };
  if (done) {
    customStyle.backgroundColor = theme.success;
  }

  return (
    <Pressable style={customStyle} onLongPress={onLongPress}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {materia}
      </Text>
      <Text style={styles.text}>{codigo}</Text>
      {prereq.split(",").map((r, i) => (
        <Text
          key={`${materia}-${prereq}-${i}`}
          style={[styles.text, { color: theme.info }]}
        >
          {r}
        </Text>
      ))}
    </Pressable>
  );
};
