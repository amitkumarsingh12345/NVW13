import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
export default function ContactForm() {
  const route = useRoute();
  const subjectName = route?.params?.name || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_no: "",
    subject: "",
    query: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { name, email, mobile_no, subject, query } = form;

    if (!name || !email || !mobile_no || !subject || !query) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://nvwebsoft.com/php_api/api.php/enquiry",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Your query has been submitted!");
        console.log("Server Response:", response.data);

        // Clear the form
        setForm({
          name: "",
          email: "",
          mobile_no: "",
          subject: "",
          query: "",
        });
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
        console.error("Server Error:", response);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to submit. Please check your connection or try again later."
      );
      console.error("Axios Error:", error.response?.data || error.message);
    }
  };

  const openSocial = (platform) => {
    switch (platform) {
      case "facebook":
        Linking.openURL("https://www.facebook.com/YourPage");
        break;
      case "whatsapp":
        Linking.openURL("https://wa.me/9307949470");
        break;
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const user_profile = await AsyncStorage.getItem("user_profile");
      const user_details = JSON.parse(user_profile);

      if (user_details) {
        setForm({
          name: user_details.name,
          email: user_details.email,
          mobile_no: user_details.mobile_no,
          subject: subjectName ? subjectName : "",
          query: "",
        });
      }
    };
    getProfile();
  }, [subjectName]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      {[
        { label: "Name", key: "name" },
        {
          label: "Email",
          key: "email",
          keyboard: "email-address",
          edit: form.email ? false : true,
        },
        {
          label: "Mobile Number",
          key: "mobile_no",
          keyboard: "phone-pad",
          edit: form.mobile_no ? false : true,
        },
        { label: "Subject", key: "subject" },
      ].map(({ label, key, keyboard, edit }) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={label}
          value={form[key]}
          onChangeText={(value) => handleChange(key, value)}
          keyboardType={keyboard || "default"}
          placeholderTextColor="#999"
          editable={edit}
        />
      ))}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Query"
        value={form.query}
        onChangeText={(value) => handleChange("query", value)}
        multiline
        numberOfLines={5}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Or reach us via</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => openSocial("facebook")}>
            <FontAwesome
              name="facebook-square"
              size={40}
              color="#4267B2"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocial("whatsapp")}>
            <FontAwesome
              name="whatsapp"
              size={40}
              color="#25D366"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    borderRadius: 15,
    margin: 15,

    // boxShadow: "0px 0px 1px #003463",
  },
  title: {
    fontSize: 26,
    fontFamily: "Ubuntu-Bold",
    marginBottom: 30,
    color: "#003463",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    fontFamily: "Ubuntu-Light",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
    fontFamily: "Ubuntu-light",
  },
  button: {
    backgroundColor: "#003463",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Ubuntu-Light",
  },
  socialContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  socialText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    fontFamily: "Ubuntu-Light",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 15,
  },
});
