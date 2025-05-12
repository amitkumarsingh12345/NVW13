import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrentLocation from "@/src/components/CurrentLocation";
import * as Device from "expo-device";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  // Get & Set Token Start-----------
  const findTokenHandler = async (reg_id) => {
    const id = Device.osInternalBuildId || Device.osBuildId || "unknown";
    setDeviceId(id);
    const payload = {
      token_id: id,
      registration_id: reg_id,
    };

    const response = await axios.post(
      "https://nvwebsoft.com/php_api/api.php/token",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  // Get & Set Token End-----------

  const getUserProfile = async (id) => {
    const url = "https://nvwebsoft.com/php_api/api.php/get_profile";
    const formData = new FormData();
    formData.append("registration_id", id);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      findTokenHandler(id);

      return response.data;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (!identifier) {
      Alert.alert("Error", "Please enter your email or mobile number");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        [identifier.includes("@") ? "email" : "mobile_no"]: identifier,
      };

      const response = await axios.post(
        "https://nvwebsoft.com/php_api/api.php/log_in",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message) {
        const data = await getUserProfile(response.data.message);

        if (data) {
          await AsyncStorage.setItem("user_profile", JSON.stringify(data));
        }
      }

      // Store User Id Start
      await AsyncStorage.setItem(
        "user_id",
        JSON.stringify(response.data.message)
      );
      // Store User Id End

      // Get User Id Start
      const user_id = await AsyncStorage.getItem("user_id");
      // Get User Id End

      if (response.status == 200) {
        Alert.alert("Success", "Login successful");
        router.push("/(main)/home");
      } else {
        Alert.alert("Error", response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Network request failed. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CurrentLocation />
      <Animated.Image
        source={require("../../assets/images/icon.png")}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="contain"
        accessibilityLabel="App logo"
        accessibilityRole="image"
      />

      <Text style={styles.title}>Welcome to NVW</Text>
      <Text style={styles.subtitle}>Login with Email or Phone</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        placeholderTextColor="#888"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="default"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* <Text style={styles.orText}>OR</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color="#4267B2" />
          <Text style={styles.socialText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Ubuntu-Medium",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#777",
    fontFamily: "Ubuntu-Regular",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    color: "#333",
    fontFamily: "Ubuntu-Regular",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#003463",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Ubuntu-Regular",
  },
  orText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 15,
  },
  socialContainer: {
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  socialText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  signupLink: {
    color: "#49B1C5",
    fontWeight: "600",
  },
});
