import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../context";
import { ROUTES } from "../../navigation/routes";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../database/firebase";

export const RegisterScreen = ({ navigation }) => {
  const { setUsername } = useContext(UserContext);

  const [state, setState] = useState({
    name: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    const { name, email, contraseña, confirmarContraseña } = state;
  
    if (!name || !email || !contraseña || !confirmarContraseña) {
      Alert.alert("Error", "Rellena todos los campos.");
      return;
    }
  
    if (contraseña !== confirmarContraseña) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        contraseña
      );
      const user = userCredential.user;
  
      // Guardar datos adicionales en Firestore
      await addDoc(collection(db, "usuarios"), {
        authid: user.uid,
        name,
        email,
      });
  
      Alert.alert("Éxito", "Usuario registrado correctamente.");
      setUsername(name);
      navigation.navigate(ROUTES.INICIO);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#444"
        onChangeText={(value) => handleChangeText("name", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        placeholderTextColor="#444"
        onChangeText={(value) => handleChangeText("email", value)}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          placeholderTextColor="#444"
          onChangeText={(value) => handleChangeText("contraseña", value)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#444"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar contraseña"
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor="#444"
          onChangeText={(value) =>
            handleChangeText("confirmarContraseña", value)
          }
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="#444"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveNewUser}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#D9E3F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9E3F0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: "#000",
  },
  button: {
    backgroundColor: "#00A8FF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#007BFF",
    textAlign: "center",
  },
});
