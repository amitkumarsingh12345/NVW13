import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export default function ServiceCard({ name, icon, getDetails }) {
  return (
    <TouchableOpacity onPress={() => getDetails(name)}>
      <View style={serviceCard.container}>
        <Image
          source={{
            uri: `https://nvwebsoft.com/php_api/assets/website_upload/service/${icon}`,
          }}
          height={45}
          width={45}
          style={serviceCard.image}
        />
        <Text style={serviceCard.cardText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

// const serviceCard = StyleSheet.create({
//   container: {
//     width: width * 0.28,
//     height: height * 0.12,
//     alignItems: "center",
//     padding: 10,
//     marginBottom: 15,
//     gap: 5,
//     // boxShadow: "0px 0px 1px #003463",
//     borderRadius: 8,
//     justifyContent: "space-around",

//     fontFamily: "Ubuntu-Regular",
//     boxShadow:
//       "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(255,255,255,0.6)",
//   },
//   cardText: {
//     fontSize: 9,
//     textAlign: "center",
//     fontWeight: 600,
//   },
//   image: {
//     margin: "auto",
//   },
// });

const serviceCard = StyleSheet.create({
  container: {
    width: width * 0.443,
    height: height * 0.08,
    alignItems: "center",
    padding: 10,

    marginBottom: 10,
    // backgroundColor: "#003463",
    gap: 2,
    // boxShadow: "0px 0px 1px #003463",
    boxShadow: "0px 0px 1px gray",
    borderRadius: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow:
      "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(255,255,255,0.6)",
  },
  cardText: {
    fontSize: 9,
    width: "60%",
    fontFamily: "Ubuntu-Bold",
    // color: "#fff",
  },
});
