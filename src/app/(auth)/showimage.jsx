import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function show_profile_image() {
  const { image_path } = useLocalSearchParams();
  return (
    <View style={styles.imageContainer}>
      <Image
        source={
          image_path
            ? { uri: image_path }
            : require("../../assets/images/icon.png")
        }
        width={width}
        height={width}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
