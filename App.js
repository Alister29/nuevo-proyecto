import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider, ThemeProvider } from "./context";
import { DrawerMenu } from "./navigation";

export default function App() {
  return (
    // Envolver todo dentro del UserProvider para que el contexto esté disponible globalmente
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <DrawerMenu />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}
