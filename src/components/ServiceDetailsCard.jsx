import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

// Shimmer Import
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function ServiceDetailsCard({ id }) {
  const [dataDetails, setDataDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const postServiceDetail = async () => {
      try {
        const result = await axios.get(
          "https://nvwebsoft.com/php_api/api.php/service_with_desc"
        );
        setDataDetails(result.data);

        if (id) {
          const result = dataDetails?.filter(
            (data) => data.service_menu_id == id
          );
          setDataDetails(result);
        }
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    postServiceDetail();
  }, [id, dataDetails]);

  if (isLoading) {
    // Shimmer effect while loading
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {[1, 2, 3, 4].map((_, index) => (
          <>
            <ShimmerPlaceholder
              key={index}
              style={styles.image}
              shimmerColors={["#e1e9ee", "#f2f8fc", "#e1e9ee"]}
            />
            <View style={styles.cardBody}>
              <ShimmerPlaceholder
                style={{ width: "70%", height: 20, marginBottom: 10 }}
              />
              <ShimmerPlaceholder style={{ width: "90%", height: 14 }} />
            </View>
          </>
        ))}
      </ScrollView>
    );
  }

  if (!dataDetails) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dataDetails?.map((data, index) => (
        <View style={styles.card} key={data.service_menu_id}>
          <Image
            source={{
              uri: `https://nvwebsoft.com/php_api/assets/website_upload/service/${data.service_img}`,
            }}
            style={styles.image}
          />
          <View style={styles.cardBody}>
            <Text style={styles.title}>{data.service_name}</Text>
            <Text style={styles.text}>{data.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  listGroup: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 14,
  },
  link: {
    color: "#007bff",
    fontSize: 14,
    marginTop: 10,
  },
});
