import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { allConstant } from "@/src/constants/Constant";
import { router, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function NotificationCard() {
  const [notifications, setNotifications] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // For toggling expanded item
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.post(
          "https://nvwebsoft.com/php_api/api.php/notification"
        );
        setNotifications(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Error fetching notifications. Please try again later.");
        setLoading(false); // Stop loading even if there is an error
      }
    };

    getNotifications();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Loading state: Show spinner while data is being fetched
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // Error state: Show error message if data fetching fails
  if (error) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            marginTop: 20,
            fontSize: 18,
            fontFamily: "Ubuntu-Medium",
          }}
        >
          Notifications
        </Text>
        <MaterialIcons
          name="double-arrow"
          size={15}
          color={"black"}
          style={{
            marginTop: 20,
            fontFamily: "Ubuntu-Light",
          }}
        />
      </View>

      {notifications?.length > 0 ? (
        notifications.map((data, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <TouchableOpacity key={index} onPress={() => toggleExpand(index)}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/showimage",
                      params: { image_path: data.notification_img },
                    })
                  }
                >
                  <Image
                    source={
                      data.notification_img
                        ? { uri: data.notification_img }
                        : require("../../assets/images/icon.png")
                    }
                    style={styles.imageAvatar}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontFamily: "Ubuntu-Regular", marginBottom: 4 }}
                  >
                    {data.title}
                  </Text>
                  <Text style={styles.text}>
                    {isExpanded
                      ? data.description
                      : `${data.description?.substring(0, 30)}...`}
                  </Text>
                </View>
                <Text style={styles.timeText}>{data.sub_date}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Image
          source={require("../../assets/images/no_data.png")}
          resizeMode="contain"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "Ubuntu-Regular",

    padding: 10,
    marginTop: allConstant.os == "ios" && -40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  text: {
    fontSize: 11,
    color: "#333",
    fontFamily: "Ubuntu-Light",
  },
  imageAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 10,
    alignSelf: "flex-start",
    fontFamily: "Ubuntu-Regular",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
