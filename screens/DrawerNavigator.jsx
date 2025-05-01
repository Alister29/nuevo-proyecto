import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "./HomeScreen";
import { Menu } from "./Menu";
import { RegisterScreen } from "./auth/RegisterScreen";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Menu {...props} />}
      screenOptions={{
        drawerType: "slide",
        drawerPosition: "left",
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Usuarios" component={RegisterScreen} />

      {/* Puedes añadir más pantallas aquí */}
    </Drawer.Navigator>
  );
};
