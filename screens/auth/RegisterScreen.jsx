import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../context";
import { ROUTES } from "../../navigation/routes";

export const RegisterScreen = ({ navigation }) => {
  const { user, loading, register } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate(ROUTES.INICIO);
    }
  }, [user]);

  const [state, setState] = useState({
    name: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
    validateField(name, value);
  };

  const validateField = async (name, value) => {
    const newErrors = { ...errors };

    if (name === "name") {
      if (!value.trim()) {
        delete newErrors.name;
      } else if (!value.trim()) {
        newErrors.name = " El nombre de usuario es obligatorio.";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        delete newErrors.email;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = " El correo no es válido.";
        } else {
          delete newErrors.email;
        }
      }
    }

    if (name === "contraseña") {
      if (!value.trim()) {
        delete newErrors.contraseña;
      } else if (value.length < 6) {
        newErrors.contraseña =
          " La contraseña debe tener al menos 6 caracteres.";
      } else {
        delete newErrors.contraseña;
      }
    }

    if (name === "confirmarContraseña") {
      if (!value.trim()) {
        delete newErrors.confirmarContraseña;
      } else if (value !== state.contraseña) {
        newErrors.confirmarContraseña = " Las contraseñas no coinciden.";
      } else {
        delete newErrors.confirmarContraseña;
      }
    }

    setErrors(newErrors);
  };

  const saveNewUser = async () => {
    const { name, email, contraseña, confirmarContraseña } = state;
    const newErrors = {};

    if (!name) newErrors.name = " El nombre de usuario es obligatorio.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = " El correo no es válido.";
    if (contraseña.length < 6)
      newErrors.contraseña = " La contraseña debe tener al menos 6 caracteres.";
    if (contraseña !== confirmarContraseña)
      newErrors.confirmarContraseña = " Las contraseñas no coinciden.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(email, contraseña, name);

      if (Platform.OS === "web") {
        alert("Usuario registrado correctamente.");
      } else {
        Alert.alert("Éxito", "Usuario registrado correctamente.");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/username-already-in-use":
          setErrors({ ...errors, name: error.message });
          break;
        case "auth/email-already-in-use":
          setErrors({ ...errors, email: error.message });
          break;
        case "auth/invalid-email":
          setErrors({ ...errors, email: error.message });
          break;
        default:
          if (Platform.OS === "web") {
            alert(error.message);
          } else {
            Alert.alert("Error", error.message);
          }
      }
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
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        placeholderTextColor="#444"
        onChangeText={(value) => handleChangeText("email", value)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

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
      {errors.contraseña && (
        <Text style={styles.errorText}>{errors.contraseña}</Text>
      )}

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
      {errors.confirmarContraseña && (
        <Text style={styles.errorText}>{errors.confirmarContraseña}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, loading && styles.disabled]}
        onPress={saveNewUser}
        disabled={loading}
      >
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
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
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#69C7F9",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  linkText: {
    color: "#007BFF",
    textAlign: "left",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  disabled: {
    backgroundColor: "#ccc",
  },
});
