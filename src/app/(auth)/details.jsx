import CurrentLocation from "@/src/components/CurrentLocation";
import { allConstant } from "@/src/constants/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const { width } = Dimensions.get("window");

export default function ServiceDetailsCard() {
  const route = useRoute();
  let search = route?.params?.query || "";

  const [dataDetails, setDataDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [findMore, setFindMore] = useState(false);
  const [id, setId] = useState();
  const [location, setLocation] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const postServiceDetail = async () => {
      const url = "https://nvwebsoft.com/php_api/api.php/service_search";
      const formData = new FormData();

      formData.append("query", search);
      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setDataDetails(response?.data || []);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    postServiceDetail();
  }, [search]);

  // Search Query With Location Start

  useEffect(() => {
    const getLocationHandler = async () => {
      const location = await AsyncStorage.getItem("user_location");
      const user_id = await AsyncStorage.getItem("user_id");
      setId(user_id);
      setLocation(location);
    };
    getLocationHandler();
  }, []);

  useEffect(() => {
    const postSearchDetail = async () => {
      const formData = new FormData();
      formData.append("user_id", id);
      formData.append("location", location);
      formData.append("service_id", search);

      try {
        const response = await axios.post(
          "https://nvwebsoft.com/php_api/api.php/location_user_service",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from PHP API:", response.data);
      } catch (err) {
        console.error("Error posting search detail:", err);
      }
    };

    postSearchDetail();
  }, [search, location, id]);

  // Search Query With Location End

  const getDetailsHandler = (name) => {
    navigation.navigate("contact", { name: name });
    Keyboard.dismiss();
  };

  const toggleDescription = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItems[item.service_menu_id];
    const shortDescription =
      item.description.length > 100
        ? item.description.substring(0, 100) + "..."
        : item.description;

    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://nvwebsoft.com/php_api/assets/website_upload/service/${item.service_img}`,
          }}
          resizeMode="stretch"
          style={styles.image}
        />
        <View style={styles.cardBody}>
          <Text style={styles.title}>{item.service_name}</Text>
          <Text style={styles.text}>
            {isExpanded ? item.description : shortDescription}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 30,
            }}
          >
            {item.description.length > 100 && (
              <Text
                style={styles.link}
                onPress={() => toggleDescription(item.service_menu_id)}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => getDetailsHandler(item.service_name)}
              style={{
                backgroundColor: "#49B1C5",
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  padding: allConstant.os == "ios" ? 10 : 8,
                  fontSize: 12,
                  paddingHorizontal: 11,
                  fontFamily: "Ubuntu-Light",
                }}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => (
          <View style={styles.card}>
            <ShimmerPlaceholder
              style={styles.image}
              shimmerColors={["#e1e9ee", "#f2f8fc", "#e1e9ee"]}
            />
            <View style={styles.cardBody}>
              <ShimmerPlaceholder
                style={{ width: "70%", height: 20, marginBottom: 10 }}
              />
              <ShimmerPlaceholder style={{ width: "90%", height: 14 }} />
            </View>
          </View>
        )}
      />
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { padding: 20 }]}>
        <Text style={{ fontSize: 16, color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  if (!dataDetails.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Image
          source={require("../../assets/images/no_data.png")}
          resizeMode="contain"
          style={{ height: "70%", width: "70%" }}
        />
      </View>
    );
  }

  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        data={dataDetails}
        keyExtractor={(item) => item.service_menu_id.toString()}
        renderItem={renderItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "#ccc",
  },
  cardBody: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Ubuntu-Bold",
  },
  text: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Ubuntu-Light",
  },
  link: {
    color: "#49B1C5",
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Ubuntu-Light",
  },
});
