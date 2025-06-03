import React from "react";
import {
  Modal,
  View,
  Pressable,
  Platform,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export const ViewPDF = ({ isVisible, file, onClose }) => {
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View style={styles.container}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="#333" />
        </Pressable>

        {Platform.OS === "web" ? (
          <iframe
            src={file}
            width="100%"
            height="100%"
            title="PDF Viewer"
            style={{ border: "none" }}
          />
        ) : (
          <WebView
            originWhitelist={["*"]}
            source={{ uri: file}}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webText: {
    fontSize: 18,
    color: "#444",
  },
  webview: {
    flex: 1,
    marginTop: 60,
  },
});
