import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ROUTES } from "../routes";
import { ThemeContext } from "../../context";
import { DrawerContentAdmin } from "./DrawerContentAdmin";
import {
  DocumentoScreen,
  EventoScreen,
  HorarioScreen,
  InicioScreen,
  MallaScreen,
  MapaScreen,
} from "../../screens/admin";

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
      <Drawer.Screen name={ROUTES.ADMIN_SUBIR_MALLA} component={MallaScreen} />
      <Drawer.Screen
        name={ROUTES.ADMIN_SUBIR_HORARIOS}
        component={HorarioScreen}
      />
      <Drawer.Screen
        name={ROUTES.ADMIN_SUBIR_EVENTOS}
        component={EventoScreen}
      />
      <Drawer.Screen
        name={ROUTES.ADMIN_APROBAR_DOCUMENTOS}
        component={DocumentoScreen}
      />
    </Drawer.Navigator>
  );
};
