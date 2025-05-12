import { Image, View, StyleSheet } from "react-native";

export default function Logo({ logoName }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 80,
  },
});
