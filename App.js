import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";

import { AuthProvider, ThemeProvider } from "./context";
import { RootNavigator } from "./navigation";

import ErrorBoundary from "./screens/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <StatusBar backgroundColor="transparent" translucent style="dark"/>
          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
