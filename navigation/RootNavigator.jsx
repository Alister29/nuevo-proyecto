import React, { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { LoginScreen, RegisterScreen } from "../screens";
import { DrawerMenu } from "./DrawerMenu";
import { ROUTES } from "./routes";
import { UserContext } from "../context";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { setUsername } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.email);
        setIsAuthenticated(true);
      } else {
        setUsername("Usuario");
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  if (isAuthenticated === null) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
      ) : (
        <>
          <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ROUTES.REGISTRO_USUARIO} component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
