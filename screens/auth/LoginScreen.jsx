import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { UserContext } from '../../context';
import { ROUTES } from "../../navigation/routes";


import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, getAuth} from "firebase/auth";
import { auth } from "../../database/firebase";

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    user: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const { setUsername, setEmail } = useContext(UserContext);

  const handleChangeText = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const loginUser = async () => {
    const { user, password } = state;
  
    try {
      let email = user;
      let username = '';
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user)) {
        const usersRef = collection(db, 'usuarios');
        const q = query(usersRef, where('name', '==', user));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          Alert.alert('Error', 'Usuario no encontrado.');
          return;
        }
  
        const userData = querySnapshot.docs[0].data();
        email = userData.email;
        username = userData.name;
      }
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      if (username === '') {
        const usersRef = collection(db, 'usuarios');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          username = userData.name;
        }
      }
  
      Alert.alert('¡Éxito!', 'Inicio de sesión exitoso.');
      setUsername(username);
      setEmail(email);
      navigation.navigate(ROUTES.INICIO);
  
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
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
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          placeholderTextColor="#555"
          secureTextEntry={!showPassword}
          onChangeText={(value) => handleChangeText('password', value)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
        <Text style={styles.googleButtonText}>
          <Text style={{ fontSize: 18 }}>🌐 </Text>Inicia Sesion con Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: '#e1ecf4',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1ecf4',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#57b0f6',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
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
