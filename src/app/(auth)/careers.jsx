import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { allConstant } from "@/src/constants/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

export default function CareerForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    experience: "",
    esalary: "",
    qualification: "",
    job: "",
    cemp: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug form state
  useEffect(() => {
    console.log("Form state updated:", {
      ...form,
      resume: form.resume
        ? {
            name: form.resume.name,
            size: form.resume.size,
            type: form.resume.type,
          }
        : null,
    });
  }, [form]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const pickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      if (result.assets?.length > 0) {
        const file = result.assets[0];
        const fileInfo = await FileSystem.getInfoAsync(file.uri);

        if (!fileInfo.exists) {
          throw new Error("File does not exist");
        }

        // Check file size (e.g., 5MB limit)
        if (fileInfo.size > 5 * 1024 * 1024) {
          Alert.alert("Error", "File size should be less than 5MB");
          return;
        }

        setForm((prev) => ({
          ...prev,
          resume: {
            uri: file.uri,
            name: file.name || `resume_${Date.now()}`,
            type: file.mimeType || "application/octet-stream",
            size: fileInfo.size,
          },
        }));
      }
    } catch (err) {
      console.error("Document picker error:", err);
      Alert.alert("Error", "Could not pick a resume file. Please try again.");
    }
  };

  const validateForm = () => {
    const requiredFields = [
      { field: "name", label: "Name" },
      { field: "email", label: "Email" },
      { field: "contact", label: "Contact" },
      { field: "address", label: "Address" },
      { field: "experience", label: "Experience" },
      { field: "esalary", label: "Expected Salary" },
      { field: "qualification", label: "Qualification" },
      { field: "job", label: "Job Title" },
      { field: "cemp", label: "Current Employer" },
    ];

    const missingFields = requiredFields
      .filter(({ field }) => !form[field]?.trim())
      .map(({ label }) => label);

    if (!form.resume || !form.resume.uri) {
      missingFields.push("Resume");
    }

    // Email validation
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    if (missingFields.length > 0) {
      Alert.alert(
        "Missing Information",
        `Please complete: ${missingFields.join(", ")}`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all form fields except resume
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "resume" && value) {
          formData.append(key, value);
        }
      });

      // Append resume file
      if (form.resume) {
        formData.append("resume", {
          uri: form.resume.uri,
          name: form.resume.name,
          type: form.resume.type,
        });
      }

      const response = await axios.post(
        "https://nvwebsoft.com/php_api/api.php/career",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      if (response.data?.success) {
        Alert.alert("Success", "Application submitted successfully!");
        // Reset form
        setForm({
          name: "",
          email: "",
          contact: "",
          address: "",
          experience: "",
          esalary: "",
          qualification: "",
          job: "",
          cemp: "",
          resume: null,
        });
      } else {
        throw new Error(response.data?.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = "Submission failed. Please try again.";

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Find User Details Start-------------

  useEffect(() => {
    const getProfile = async () => {
      const user_profile = await AsyncStorage.getItem("user_profile");
      const user_details = JSON.parse(user_profile);

      if (user_details) {
        setForm({
          name: user_details.name,
          email: user_details.email,
          contact: user_details.mobile_no,
          address: "",
          experience: "",
          esalary: "",
          qualification: "",
          job: "",
          cemp: "",
          resume: null,
        });
      }
    };
    getProfile();
  }, []);

  // Find User Details End -------------

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Apply for a Job</Text>

      {[
        { label: "Name", key: "name" },
        { label: "Email", key: "email", keyboard: "email-address" },
        { label: "Contact Number", key: "contact", keyboard: "phone-pad" },
        { label: "Address", key: "address", multiline: true },
        { label: "Experience (Years)", key: "experience", keyboard: "numeric" },
        { label: "Expected Salary", key: "esalary", keyboard: "numeric" },
        { label: "Qualification", key: "qualification" },
        { label: "Job Title", key: "job" },
        { label: "Current Employer", key: "cemp" },
      ].map(({ label, key, keyboard, multiline }) => (
        <TextInput
          key={key}
          style={[styles.input, multiline && { height: 80 }]}
          placeholder={label}
          value={form[key]}
          onChangeText={(value) => handleChange(key, value)}
          keyboardType={keyboard || "default"}
          placeholderTextColor="#999"
          multiline={multiline}
          editable={!isSubmitting}
        />
      ))}

      <TouchableOpacity
        style={styles.resumeButton}
        onPress={pickResume}
        disabled={isSubmitting}
      >
        <Text style={styles.resumeText}>
          {form.resume
            ? `Selected: ${form.resume.name} (${Math.round(
                form.resume.size / 1024
              )} KB)`
            : "Upload Resume (PDF/DOC/DOCX)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit Application</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: allConstant.os === "ios" ? 30 : 20,
    // backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: "Ubuntu-Bold",
    marginBottom: 30,
    color: "#003463",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 50,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    minHeight: 50,
    fontFamily: "Ubuntu-Light",
  },
  resumeButton: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    borderStyle: "dashed",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#003463",
  },
  resumeText: {
    fontSize: 16,
    color: "#003463",
    fontFamily: "Ubuntu-Light",
  },
  button: {
    backgroundColor: "#003463",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Ubuntu-Bold",
  },
});
