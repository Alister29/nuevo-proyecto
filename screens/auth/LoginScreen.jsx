import React, { useState, useContext} from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importar funciones de Firestore

import { db } from '../../database/firebase'; // Asegúrate de importar la instancia de Firestore
import { UserContext } from '../../context';
import { ROUTES } from "../../navigation/routes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  separator: {
    height: 10, // Espacio entre los botones
  },
});

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    name: '',
    contraseña: '',
  });
  const { setUsername } = useContext(UserContext);
  const handleChangeText = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const loginUser = async () => {
    try {
      // Crear consulta a Firestore
      const usersRef = collection(db, 'usuarios'); // Referencia a la colección
      const q = query(usersRef, where('name', '==', state.name), where('contraseña', '==', state.contraseña)); // Filtrar por usuario y contraseña

      const querySnapshot = await getDocs(q); // Ejecutar la consulta

      if (querySnapshot.empty) {
        // Si no se encontró ningún documento que coincida
        Alert.alert('Error', 'Usuario o contraseña incorrectos.');
      } else {
        // Usuario válido, redirigir a la pantalla principal
        Alert.alert('¡Éxito!', 'Inicio de sesión exitoso.');
        setUsername(state.name);
        navigation.replace(ROUTES.INICIO); // Navegar a la pantalla principal
        
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al procesar tu solicitud.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate(ROUTES.REGISTRO_USUARIO); // Navegar a la pantalla de registro
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(value) => handleChangeText('name', value)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Contraseña"
        onChangeText={(value) => handleChangeText('contraseña', value)}
      />
      <Button title="Iniciar sesión" onPress={loginUser} />
      <View style={styles.separator} />
      <Button title="Crear cuenta" onPress={navigateToRegister} />
    </View>
  );
};