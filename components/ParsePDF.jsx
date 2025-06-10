import React from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";

import * as pdfParser from "../utils/pdfParser";

export const ParsePDF = ({ uri, onExtract }) => {
  if (!uri || Platform.OS !== "Android") return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <script src="./pdfjs/pdf.mjs/"></script>
    </head>
    <body>
      <script>
        const pdfUrl = "${uri}";

        const extractText = async () => {
          const loadingTask = pdfjsLib.getDocument(pdfUrl);
          const pdf = await loadingTask.promise;

          const fullText = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            fullText.push(...strings);
          }

          // Enviar resultado a React Native
          window.ReactNativeWebView.postMessage(JSON.stringify(fullText));
        };

        extractText().catch(error => {
          window.ReactNativeWebView.postMessage("ERROR: " + error.message);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ width: 0, height: 0 }}>
      <WebView
        source={{ html }}
        javaScriptEnabled
        onMessage={(event) => {
          try {
            const result = JSON.parse(event.nativeEvent.data);
            onExtract(pdfParser.parse(result));
          } catch (e) {
            console.error("Error al parsear texto PDF:", e);
          }
        }}
      />
    </View>
  );
};
