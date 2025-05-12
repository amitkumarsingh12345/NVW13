import { router, Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Logo from "@/src/components/Logo";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import { allConstant } from "@/src/constants/Constant";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

/* Bottom Sheet Dependencies Start */
import React, { useRef, useState, useEffect } from "react";
import { MaterialIcons as MDIcon } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { bottomSheet } from "@/src/styles/components_style";
import AsyncStorage from "@react-native-async-storage/async-storage";
/* Bottom Sheet Dependencies End */

const { width } = Dimensions.get("window");

export default function MainLayout() {
  const refStandard = useRef();
  const [notificationCount, setNotificationCount] = useState(1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const listData = [
    { icon: "account-circle", label: "Profile" },
    { icon: "format-quote", label: "Quotation" },
    { icon: "location-on", label: "Location" },
    { icon: "engineering", label: "Careers" },
  ];

  // Check Login or Not
  useEffect(() => {
    const checkUserLoginHandler = async () => {
      const user_id = await AsyncStorage.getItem("user_id");

      if (!user_id) {
        router.push("/(auth)/login");
      }
    };
    checkUserLoginHandler();
  }, []);

  const bottomSheetNavigateHandler = (props) => {
    const url = props.toLowerCase();
    router.push(`/(auth)/${url}`);
    refStandard.current.close();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Logout Handler Start------------

  const logoutHandler = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("user_id");
            await AsyncStorage.removeItem("user_profile");
            refStandard.current.close();
            Alert.alert("Success", "Logged Out !!");
            router.push("/(auth)/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Logout Handler End------------

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Bottom Sheet Start */}
      <RBSheet
        ref={refStandard}
        draggable
        dragOnContent
        height={allConstant.os == "ios" ? 280 : 235}
      >
        <ScrollView style={bottomSheet.listContainer}>
          <Text style={bottomSheet.listTitle}>Create</Text>
          {listData.map((list, index) => (
            <TouchableOpacity
              key={index}
              style={bottomSheet.listButton}
              onPress={() => bottomSheetNavigateHandler(list.label)}
            >
              <MDIcon name={list.icon} style={bottomSheet.listIcon} />
              <Text style={bottomSheet.listLabel}>{list.label}</Text>
            </TouchableOpacity>
          ))}

          {/* Logout Button Start*/}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              marginBottom: 15,
            }}
            onPress={logoutHandler}
          >
            <MDIcon
              name={"logout"}
              style={[bottomSheet.listIcon, { color: "red", fontWeight: 600 }]}
            />
            <Text
              style={[bottomSheet.listLabel, { color: "red", fontWeight: 600 }]}
            >
              Logout
            </Text>
          </TouchableOpacity>
          {/* Logout Button End*/}
        </ScrollView>
      </RBSheet>
      {/* Bottom Sheet End */}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#031273",
          tabBarInactiveTintColor: "gray",
          headerTitle: () => <Logo />,
          headerTitleAlign: "left",
          headerStyle: {
            height: allConstant.os == "ios" ? 120 : 65,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            alignContent: "flex-start",
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <View style={styles.headerRight}>
                <Ionicons
                  name="notifications-sharp"
                  size={22}
                  color={"#003463"}
                />
                {/* Badge View */}
                {false && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{notificationCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ),
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 5,
            shadowOpacity: 0.1,
            height: isKeyboardVisible ? 0 : allConstant.os === "ios" ? 100 : 50,
            display: isKeyboardVisible ? "none" : "flex",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: true,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-sharp" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="services"
          options={{
            tabBarLabel: "Services",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="tools" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            tabBarLabel: "Portfolio",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Feather name="briefcase" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="contact"
          options={{
            tabBarLabel: "Contact",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Ionicons name="mail-sharp" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            tabBarLabel: "More",
            tabBarLabelStyle: {
              color: "gray",
            },
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications-sharp" size={24} color={"#fff"} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} disabled={true} />
            ),
          }}
        />
      </Tabs>

      {/* Floating Button to Open Bottom Sheet */}
      {!isKeyboardVisible && (
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => refStandard.current?.open()}
            accessibilityLabel="Open menu"
            accessibilityRole="button"
          >
            <Ionicons name="menu-sharp" size={22} color="gray" />
          </TouchableOpacity>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    position: "absolute",
    bottom: allConstant.os === "ios" ? 57 : "0.9%",
    right: allConstant.os === "ios" ? 16 : "3.4%",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginEnd: 20,
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
