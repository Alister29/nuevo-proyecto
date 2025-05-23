import "react-native-gesture-handler";
import React from "react";
import { AuthProvider, ThemeProvider } from "./context";
import { RootNavigator } from "./navigation";

import ErrorBoundary from "./screens/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
