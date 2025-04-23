import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./HomeScreen";
import Menu from "./Menu";
import Usuarios from './Usuarios';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Menu {...props} />}
      screenOptions={{
        drawerType: 'slide',
        drawerPosition: 'left',
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Usuarios" component={Usuarios} />

      {/* Puedes añadir más pantallas aquí */}
    </Drawer.Navigator>
  );
}
