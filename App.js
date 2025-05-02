import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider, ThemeProvider } from "./context";
import { RootNavigator } from "./navigation/RootNavigator"; // Usa el RootNavigator

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}
