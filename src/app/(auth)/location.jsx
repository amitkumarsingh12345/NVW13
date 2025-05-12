import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

const Location = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          source={{
            html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { margin: 0; padding: 0; }
                  iframe { width: 100%; height: 100%; border: none; }
                </style>
              </head>
              <body>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.66196181465!2d81.85196737445064!3d25.449562621434477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acababc858c15%3A0xf3f09a3765e4599a!2sN.V.%20Websoft%20Services%20Pvt.Ltd.!5e0!3m2!1sen!2sin!4v1746446038808!5m2!1sen!2sin" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </body>
            </html>
          `,
          }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
        />
      </View>
      <Text style={{ fontFamily: "Ubuntu-Regular", fontSize: 15 }}>
        Get Location
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    width: "50%",
    height: "20%",
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Location;
