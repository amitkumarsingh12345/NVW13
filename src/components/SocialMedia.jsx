import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Linking } from "react-native";

export default function SocialMedia() {
  const openSocial = (platform) => {
    switch (platform) {
      case "facebook":
        Linking.openURL("https://www.facebook.com/YourPage");
        break;
      case "whatsapp":
        Linking.openURL("https://wa.me/9307949470");
        break;
    }
  };

  return (
    <View style={styles.socialContainer}>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => openSocial("facebook")}>
          <FontAwesome
            name="facebook-square"
            size={30}
            color="#4267B2"
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openSocial("whatsapp")}>
          <FontAwesome
            name="whatsapp"
            size={30}
            color="#25D366"
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openSocial("instagram")}>
          <FontAwesome
            name="instagram"
            size={30}
            color="#C13584"
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openSocial("telegram")}>
          <FontAwesome5
            name="telegram"
            size={30}
            color="#0088cc"
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openSocial("nvw")}>
          <FontAwesome5
            name="globe"
            size={30}
            color="#003463"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialContainer: {
    justifyContent: "space-evenly",
    marginTop: 15,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginBottom: 25,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  icon: {
    marginHorizontal: 12,
    padding: 5,
  },
});
