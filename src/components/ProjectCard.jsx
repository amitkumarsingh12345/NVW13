import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { allConstant } from "../constants/Constant";

export default function ProjectCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=600", // replace with your image URL
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.cardBody}>
          <Text style={styles.title}>Card title</Text>
          <Text style={styles.description}>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Text>
          <Text style={styles.timestamp}>Last updated 3 mins ago</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    margin: 16,
    marginHorizontal: allConstant.os == "ios" ? 30 : 16,
    maxWidth: 540,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  row: {
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
});
