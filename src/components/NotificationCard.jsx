import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { notificationCard } from "../styles/components_style";

export default function NotificationCard({
  title,
  description,
  sub_date,
  notification_img,
  id,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={notificationCard.row} key={id}>
      <Image source={{ uri: notification_img }} style={styles.imageAvatar} />
      <Text style={notificationCard.title}>{title}</Text>
      <Text style={notificationCard.text}>
        {" "}
        Yahan aapke diye gaye HTML table ko React Native ke components mein
        convert kiya gaya hai.
      </Text>
      <Text style={styles.timeText}>{sub_date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageAvatar: {
    width: 25,
    height: 25,
    borderRadius: 22.5,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
  },
});
