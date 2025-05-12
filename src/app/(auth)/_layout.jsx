import { Stack, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialIcons as MDIcon } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Check User Login or Not Start

  useEffect(() => {
    const checkIsLogin = async () => {
      const user_id = await AsyncStorage.getItem("user_id");

      if (user_id) {
        navigation.push("/(main)/home");
      }
    };
    checkIsLogin();
  }, []);

  // Check User Login or Not End

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          height: 200,
        },
        headerTitle: () => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back"
                size={25}
                color="#003463"
                style={{ padding: 5 }}
              />
            </TouchableOpacity>

            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Ubuntu-Medium",
                  color: "#003463",
                }}
              >
                {pathname.substring(1).toLocaleUpperCase()}
              </Text>
            </View>
          </View>
        ),
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ headerShown: true }} />
      <Stack.Screen name="profile" options={{ headerShown: true }} />
      <Stack.Screen name="logout" options={{ headerShown: false }} />
      <Stack.Screen name="careers" options={{ headerShown: true }} />
      <Stack.Screen name="location" options={{ headerShown: true }} />
      <Stack.Screen name="quotation" options={{ headerShown: true }} />
      <Stack.Screen name="showimage" options={{ headerShown: false }} />
    </Stack>
  );
}
