import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

// Shimmer Import
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

let portfolioData;

export default function ImageCard() {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigation = useNavigation();

  useEffect(() => {
    const getProjectsData = async () => {
      try {
        const result = await axios.post(
          "https://nvwebsoft.com/php_api/api.php/portfolio"
        );
        portfolioData = result.data;
        setProject(result.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after data is fetched
      }
    };
    getProjectsData();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {isLoading
        ? // Shimmer effect while loading
          Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.card}>
              <ShimmerPlaceholder
                style={styles.image}
                visible={false}
                shimmerColors={["#ebf3ff", "#d1e3ff", "#ebf3ff"]}
                duration={1200}
                LinearGradient={LinearGradient}
              />
              <ShimmerPlaceholder
                style={[
                  styles.cardBody,
                  { width: 40, height: 40, borderRadius: 100, marginTop: 10 },
                ]}
              />
            </View>
          ))
        : // Render actual content after loading
          project?.map((data, index) => (
            <View style={styles.card} key={index}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("portfolio", {
                      portfolio_title: data.portfolio_title,
                      portfolio_img: data.portfolio_img,
                      portfolio_desc: data.portfolio_desc,
                      portfolio_link: data.portfolio_link,
                    })
                  }
                >
                  <Image
                    source={
                      data.portfolio_img
                        ? { uri: data.portfolio_img }
                        : require("../assets/images/icon.png")
                    }
                    resizeMode="stretch"
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("portfolio", {
                    portfolio_title: data.portfolio_title,
                    portfolio_img: data.portfolio_img,
                    portfolio_desc: data.portfolio_desc,
                    portfolio_link: data.portfolio_link,
                  })
                }
              >
                <View style={styles.cardBody}>
                  <View style={styles.textContainer}>
                    <Text style={{ fontFamily: "Ubuntu-Medium" }}>
                      {data.portfolio_title}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.title,
                      { fontWeight: 400, fontFamily: "Ubuntu-Light" },
                    ]}
                  >
                    {data.portfolio_desc?.substring(3, 100)}...
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.divider}>
                <Text />
              </View>

              <View style={styles.buttonContainer}>
                <Text style={{ fontWeight: 500, fontFamily: "Ubuntu-Light" }}>
                  Show Details {">>"}
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Link
                    href={data.portfolio_link}
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      fontFamily: "Ubuntu-Light",
                    }}
                  >
                    Click here
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
          ))}
    </ScrollView>
  );
}

export { portfolioData };

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "no-wrap",
  },
  card: {
    borderRadius: 15,
    width: width * 0.75,
    height: height * 0.43,
    alignItems: "center",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    boxShadow: "0px 0px 1px #003463",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginEnd: 10,
    padding: 10,
    backgroundColor: "#fff",
    boxShadow:
      "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(255,255,255,0.6)",

    // boxShadow:
    //   "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(0,0,0,0.2)",
  },
  image: {
    width: width * 0.7,
    height: height * 0.2,
    borderRadius: 5,
  },
  cardBody: {},
  title: {
    fontSize: 12,
    fontWeight: 700,
  },
  text: {
    fontSize: 12,
  },
  textContainer: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 80,
  },
  button: {
    backgroundColor: "#003463",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#fff",
    shadowColor: "#003463",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
