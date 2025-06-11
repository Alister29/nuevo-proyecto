import React, { createContext, useContext, useEffect, useState } from "react";
// Librerias para escribir, leer, buscar en db de firebase
import { doc, getDoc, setDoc } from "firebase/firestore";

// Librerias para autentificacion en firebase
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Librerias para autentificacion con google
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

// Configuracion a conexion firebase
import { db, auth, COLLECTIONS } from "../database";
// Otros servicios para Users
import * as userService from "../services/userService";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({
      scheme: "reactnativeFirebase",
      useProxy: false,
    })
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const loadUserData = async () => {
        if (firebaseUser) {
          const docRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setUser({ uid: firebaseUser.uid, ...snap.data() });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      };
      loadUserData();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const googleAuth = async () => {
      if (response?.type === "success") {
        const { idToken, accessToken } = response.authentication;

        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        const userCredential = await signInWithCredential(auth, credential);

        const docRef = doc(db, COLLECTIONS.USERS, userCredential.user.uid);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          const { uid, displayName, email } = userCredential.user;
          await setDoc(docRef, {
            uid,
            username: displayName,
            email,
          });
        }
      }
      else{
        setLoading(false);
      }
    };
    googleAuth();
  }, [response]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userExists = await userService.findByEmail(email);
      if (userExists.empty) {
        const error = new Error();
        error.code = "auth/user-not-found";
        throw error;
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      let message = "";
      switch (error.code) {
        case "auth/invalid-email":
          message = "Email inválido";
          break;
        case "auth/user-not-found":
          message = "Usuario no encontrado";
          break;
        case "auth/wrong-password":
          message = "Contraseña incorrecta";
          break;
        case "auth/network-request-failed":
          message = "Verifica tu red e inténtalo de nuevo.";
          break;
        case "auth/too-many-requests":
          message = "Demasiados intentos fallidos. Intenta más tarde.";
          break;
        default:
          message = "Error al iniciar sesión. Verifica tus datos.";
      }
      const newError = new Error(message);
      newError.code = error.code;
      throw newError;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    await promptAsync();
  };

  const register = async (email, password, username) => {
    setLoading(true);
    try {
      const checkUsername = await userService.find(username);
      if (!checkUsername.empty) {
        const error = new Error();
        error.code = "auth/username-already-in-use";
        throw error;
      }

      const checkEmail = await userService.findByEmail(email);
      if (!checkEmail.empty) {
        const error = new Error();
        error.code = "auth/email-already-in-use";
        throw error;
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, COLLECTIONS.USERS, credential.user.uid), {
        uid: credential.user.uid,
        username,
        email,
      });
    } catch (error) {
      setLoading(false);
      let message = "";
      switch (error.code) {
        case "auth/username-already-in-use":
          message = "El nombre de usuario ya está registrado.";
          break;
        case "auth/email-already-in-use":
          message = "El correo ya está registrado.";
          break;
        case "auth/invalid-email":
          message = "El correo es inválido.";
          break;
        case "auth/network-request-failed":
          message = "Verifica tu red e inténtalo de nuevo.";
          break;
        default:
          message = error.message;
      }
      const newError = new Error(message);
      newError.code = error.code;
      throw newError;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro un AuthProvider");
  return context;
};
