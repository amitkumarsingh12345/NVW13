import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { WebView } from "react-native-webview";

const MapScreen = () => {
  return (
    <WebView
      source={{
        uri: "https://maps.app.goo.gl/tAMy6r7z2P8Tewmb7",
      }}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0, // Account for status bar
  },
  webview: {
    flex: 1,
  },
});

export default MapScreen;
