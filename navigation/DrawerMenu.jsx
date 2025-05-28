import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  InicioScreen,
  HorarioScreen,
  ProgresoScreen,
  EventosScreen,
  VerMapaScreen,
  SubirDocScreen,
  VerDocScreen,
} from "../screens";
import { LoginScreen, RegisterScreen } from "../screens/auth";
import { DrawerContent } from "./DrawerContent";
import { ROUTES } from "./routes";
import { ThemeContext } from "../context";

const Drawer = createDrawerNavigator();

export const DrawerMenu = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.INICIO}
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        drawerStyle: { backgroundColor: theme.surface },
      }}
    >
      <Drawer.Screen name={ROUTES.INICIO} component={InicioScreen} />
      <Drawer.Screen name={ROUTES.HORARIO} component={HorarioScreen} />
      <Drawer.Screen
        name={ROUTES.PROGRESO_ACADEMICO}
        component={ProgresoScreen}
      />
      <Drawer.Screen name={ROUTES.EVENTOS} component={EventosScreen} />
      <Drawer.Screen name={ROUTES.MAPA} component={VerMapaScreen} />
      <Drawer.Screen
        name={ROUTES.SUBIR_DOCUMENTOS}
        component={SubirDocScreen}
      />
      <Drawer.Screen name={ROUTES.VER_DOCUMENTOS} component={VerDocScreen} />
      <Drawer.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.REGISTRO_USUARIO}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
