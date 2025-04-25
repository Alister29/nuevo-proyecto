import React, { useState, useContext } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { db } from '../database/firebase';
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from './UserContext';

const Usuarios = ({ navigation }) => {
  const { setUsername } = useContext(UserContext); // Acceder al actualizador del contexto
  const [state, setState] = useState({
    name: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === '' || state.email === '' || state.contraseña === '' || state.confirmarContraseña === '') {
      Alert.alert('Error', 'No te olvides de rellenar todos los datos.');
      return;
    }

    if (!state.email.includes("@gmail.com") && !state.email.includes("@email.com")) {
      Alert.alert('Error', 'El correo debe contener @gmail.com o @email.com.');
      return;
    }

    if (state.contraseña !== state.confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        name: state.name,
        email: state.email,
        contraseña: state.contraseña,
      });
      Alert.alert("¡Éxito!", "Guardado correctamente.");
      setUsername(state.name);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert("Error", "Error al guardar: " + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Usuario"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(value) => handleChangeText("contraseña", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          onChangeText={(value) => handleChangeText("confirmarContraseña", value)}
        />
      </View>
      <View>
        <Button title="Registrarse" onPress={saveNewUser} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default Usuarios;
