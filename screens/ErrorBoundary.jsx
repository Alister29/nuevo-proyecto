import React from "react";
import { View, Text, StyleSheet } from "react-native";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("React Native Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Ha ocurrido un error inesperado.</Text>
          <Text selectable style={styles.errorText}>{this.state.error?.toString()}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", marginTop: 10, padding: 20 },
});

export default ErrorBoundary