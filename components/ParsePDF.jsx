import React from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";

import * as pdfParser from "../utils/pdfParser";

export const ParsePDF = ({ uri, onExtract }) => {
  if (!uri || Platform.OS !== "android") return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    </head>
    <body>
      <script>
        const pdfData = "${uri}";
        const Y_TOLERANCE = 2;

        const extractText = async () => {
          const loadingTask = pdfjsLib.getDocument({url: pdfData});
          const pdf = await loadingTask.promise;

          const allLines = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            // Agrupar por Y (líneas lógicas)
            const lines = [];

            content.items.forEach(item => {
              const y = item.transform[5];
              let foundLine = null;

              for (const line of lines) {
                if (Math.abs(line.y - y) < Y_TOLERANCE) {
                  foundLine = line;
                  break;
                }
              }

              if (foundLine) {
                foundLine.items.push(item);
              } else {
                lines.push({ y, items: [item] });
              }
            });

            // Ordenar líneas verticalmente (de arriba hacia abajo)
            lines.sort((a, b) => b.y - a.y);

            for (const line of lines) {
              // Ordenar horizontalmente
              line.items.sort((a, b) => a.transform[4] - b.transform[4]);

              // Opcional: unir sin espacio si los textos están muy cerca
              let textLine = "";
              for (let j = 0; j < line.items.length; j++) {
                const current = line.items[j];
                const prev = line.items[j - 1];

                if (j > 0) {
                  const space = current.transform[4] - (prev.transform[4] + prev.width);
                  textLine += space > 1 ? " " : ""; // Ajusta el umbral si hay mucho espacio
                }

                textLine += current.str;
              }

              allLines.push(textLine.trim());
            }
          }

          window.ReactNativeWebView.postMessage(JSON.stringify(allLines));
        };

        extractText().catch(error => {
          window.ReactNativeWebView.postMessage("ERROR: " + error.message);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View>
      <WebView
        source={{ html }}
        javaScriptEnabled
        onMessage={(event) => {
          try {
            const result = JSON.parse(event.nativeEvent.data);
            console.log(result[0]);
            if (
              result.length &&
              result[0] !== "UNIVERSIDAD MAYOR DE SAN SIMON"
            ) {
              throw new Error("PDF invalido.");
            }
            //const parsed = pdfParser.parse(result);
            //console.log(parsed);
            //onExtract(pdfParser.parse(result));
          } catch (e) {
            console.error("Error al parsear texto PDF:", e);
          }
        }}
      />
    </View>
  );
};
