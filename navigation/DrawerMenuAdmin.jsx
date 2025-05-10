import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";


import { DrawerContent } from "./DrawerContent";
import { ROUTES } from "./routes";
import { ThemeContext } from "../context";
import { DrawerContentAdmin } from "./DrawerContentAdmin";
import { LoginScreen, RegisterScreen } from "../screens";
import { DocumentoScreen, EventoScreen, HorarioScreen, InicioScreen, MallaScreen, MapaScreen } from "../screens/admin";

const Drawer = createDrawerNavigator();

export const DrawerMenuAdmin = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.ADMIN_HOME}
      drawerContent={(props) => <DrawerContentAdmin {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        drawerStyle: { backgroundColor: theme.surface },
      }}
    >
      <Drawer.Screen name={ROUTES.ADMIN_HOME} component={InicioScreen} />
      <Drawer.Screen name={ROUTES.ADMIN_HORARIO} component={HorarioScreen} />
      <Drawer.Screen
        name={ROUTES.ADMIN_MALLA}
        component={MallaScreen}
      />
      <Drawer.Screen name={ROUTES.ADMIN_EVENTOS} component={EventoScreen} />
      <Drawer.Screen name={ROUTES.ADMIN_DOCUMENTOS} component={DocumentoScreen} />
      <Drawer.Screen
        name={ROUTES.ADMIN_MAPA}
        component={MapaScreen}
      />
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
