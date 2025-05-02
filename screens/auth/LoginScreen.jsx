import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../database/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../../context';
import { ROUTES } from "../../navigation/routes";
import { Ionicons } from '@expo/vector-icons';
import { Image } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({ user: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUsername, setEmail } = useContext(UserContext);

  const handleChangeText = (field, value) => {
    setState({ ...state, [field]: value });
    setErrorMessage('');
  };

  const loginUser = async () => {
    const { user, password } = state;

    if (!user || !password) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }

    try {
      let email = user;
      let username = '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user)) {
        const usersRef = collection(db, 'usuarios');
        const q = query(usersRef, where('name', '==', user));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setErrorMessage('Usuario no encontrado.');
          return;
        }

        const userData = querySnapshot.docs[0].data();
        email = userData.email;
        username = userData.name;
      }

      await signInWithEmailAndPassword(auth, email, password);

      if (username === '') {
        const usersRef = collection(db, 'usuarios');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          username = userData.name;
        }
      }

      setUsername(username);
      setEmail(email);
      navigation.navigate(ROUTES.INICIO);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('La contraseña no coincide.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('Usuario no encontrado.');
      } else {
        setErrorMessage('Error al iniciar sesión. Verifica tus datos.');
      }
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
        placeholder="Usuario"
        placeholderTextColor="#555"
        onChangeText={(value) => handleChangeText('user', value)}
        value={state.user}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          placeholderTextColor="#555"
          secureTextEntry={!showPassword}
          onChangeText={(value) => handleChangeText('password', value)}
          value={state.password}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../../assets/google.png")} 
            style={{ width: 25, height: 25, marginRight: 10 }} />
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
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#ECF4F9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF4F9',
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
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#69C7F9',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    textAlign: 'left',
    marginTop: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
  googleButton: {
    backgroundColor: '#a9dcf6',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#000',
  },
});
