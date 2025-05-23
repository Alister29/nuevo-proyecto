import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../context";
import { ROUTES } from "../../navigation/routes";

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, loading, login, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigation.navigate(ROUTES.ADMIN_HOME);
      } else {
        navigation.navigate(ROUTES.INICIO);
      }
    }
  }, [user]);

  const handleChangeText = (field, value) => {
    setState({ ...state, [field]: value });
    setErrorMessage("");
  };

  const loginUser = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password } = state;

    if (!email || !password) {
      setErrorMessage("Por favor completa todos los campos.");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("correo invalido.");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate(ROUTES.REGISTRO_USUARIO);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido/a</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#555"
        onChangeText={(value) => handleChangeText("email", value)}
        value={state.user}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          placeholderTextColor="#555"
          secureTextEntry={!showPassword}
          onChangeText={(value) => handleChangeText("password", value)}
          value={state.password}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.disabled]}
        onPress={loginUser}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity
        style={[styles.googleButton, loading && styles.disabled]}
        onPress={loginWithGoogle}
        disabled={loading}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/google.png")}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Text style={styles.googleButtonText}>Inicia Sesión con Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#ECF4F9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECF4F9",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#69C7F9",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#000",
    fontSize: 16,
  },
  link: {
    color: "#007bff",
    textAlign: "left",
    marginTop: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },
  googleButton: {
    backgroundColor: "#a9dcf6",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#000",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
});
