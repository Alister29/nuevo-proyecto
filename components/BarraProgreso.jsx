import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ThemeContext } from "../context"; 

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  texto: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  barraBase: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  barraProgreso: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
});

export const BarraProgreso = ({ progreso, total }) => {
  const porcentaje = progreso > 0 ? progreso / total : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        {`${progreso} / ${total}`}
      </Text>
      <View style={styles.barraBase}>
        <View style={[styles.barraProgreso, { width: `${porcentaje * 100}%` }]} />
      </View>
    </View>
  );
}


