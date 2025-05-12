import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function LocationMap() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.66196181465!2d81.85196737445064!3d25.449562621434477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acababc858c15%3A0xf3f09a3765e4599a!2sN.V.%20Websoft%20Services%20Pvt.Ltd.!5e0!3m2!1sen!2sin!4v1745411657507!5m2!1sen!2sin",
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
