import React, { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { LoginScreen, RegisterScreen } from "../screens";
import { DrawerMenu } from "./DrawerMenu";
import { ROUTES } from "./routes";
import { UserContext } from "../context";
import { AdminHome } from "../screens/AdminHome";
import { DrawerMenuAdmin } from "./DrawerMenuAdmin";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { setUsername, setEmail, email } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user :', user);
      if (user) {
        setUsername(user.email);
        setEmail(user.email);
        setIsAuthenticated(true);
      } else {
        setUsername("Usuario");
        setEmail("");
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  if (isAuthenticated === null) return null;

  const isAdmin = email === "admin@gmail.com"; // 🛠️ Cambia esto según tu correo de administrador
  console.log("isAdmin:", isAdmin,isAuthenticated);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
        </>
      ) : (
        <>
          <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ROUTES.REGISTRO_USUARIO} component={RegisterScreen} />
        </>
      )}
      {/* AdminHome disponible también por si se necesita navegar manualmente */}
      <Stack.Screen name="DrawerMenuAdmin" component={DrawerMenuAdmin} />
    </Stack.Navigator>
  );
};
