import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import {
  Text,
  TextInput,
  RadioButton,
  Checkbox,
  Button,
  Title,
} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuotationForm() {
  const [identity, setIdentity] = useState("");
  const [identityDesc, setIdentityDesc] = useState("");
  const [services, setServices] = useState({
    website: false,
    androidApp: false,
    software: false,
    other: false,
  });
  const [serviceDesc, setServiceDesc] = useState("");
  const [email, setEmail] = useState("");
  const userId = "123"; // Replace with actual user_id if available from AsyncStorage or context

  // Get User Email From Storage ------------

  useEffect(() => {
    const getProfile = async () => {
      const user_profile = await AsyncStorage.getItem("user_profile");
      const user_details = JSON.parse(user_profile);
      if (user_details?.email) {
        setEmail(user_details.email);
      }
    };
    getProfile();
  }, []);

  const clearForm = () => {
    setIdentity("");
    setIdentityDesc("");
    setServices({
      website: false,
      androidApp: false,
      software: false,
      other: false,
    });
    setServiceDesc("");
    setEmail("");
  };

  const sendForm = async () => {
    const selectedServices = Object.keys(services)
      .filter((key) => services[key])
      .join(", ");

    try {
      const response = await axios.post(
        "https://nvwebsoft.com/php_api/api.php/quotation",
        new URLSearchParams({
          who_you_are: identity,
          products: selectedServices,
          website_page: identityDesc,
          descr: serviceDesc,
          email: email,
          user_id: userId,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Response:", response?.data?.message == "done");
      Alert.alert("Success", "Quotation request sent successfully!");
      clearForm();
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to send the quotation request.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Service Inquiry Form</Title>

      <Text style={styles.label}>Who are you?</Text>
      <RadioButton.Group onValueChange={setIdentity} value={identity}>
        {["Business/Org", "College/School", "Firm", "Other"].map((option) => (
          <View key={option} style={styles.radioOption}>
            <RadioButton value={option} />
            <Text style={{ fontFamily: "Ubuntu-Regular" }}>{option}</Text>
          </View>
        ))}
      </RadioButton.Group>

      <TextInput
        label="Describe who you are"
        value={identityDesc}
        onChangeText={setIdentityDesc}
        multiline
        mode="outlined"
        style={styles.input}
      />

      <Text style={styles.label}>Product/Service you want</Text>
      {[
        { key: "website", label: "Website" },
        { key: "androidApp", label: "Android App" },
        { key: "software", label: "Software" },
        { key: "other", label: "Other" },
      ].map(({ key, label }) => (
        <View key={key} style={styles.checkboxContainer}>
          <Checkbox
            status={services[key] ? "checked" : "unchecked"}
            onPress={() =>
              setServices((prev) => ({ ...prev, [key]: !prev[key] }))
            }
          />
          <Text>{label}</Text>
        </View>
      ))}

      <TextInput
        label="Describe the product/service"
        value={serviceDesc}
        onChangeText={setServiceDesc}
        multiline
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={clearForm} style={styles.button}>
          Clear
        </Button>
        <Button mode="contained" onPress={sendForm} style={styles.button}>
          Send
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    boxShadow:
      "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(255,255,255,0.6)",
  },
  title: {
    marginBottom: 20,
    fontFamily: "Ubuntu-Bold",
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "Ubuntu-Medium",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginVertical: 10,
    fontFamily: "Ubuntu-Light",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 0.45,
    fontFamily: "Ubuntu-Regular",
  },
});
