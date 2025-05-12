// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Animated,
//   Easing,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
// } from "react-native";
// import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { allConstant } from "@/src/constants/Constant";
// import { router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import * as FileSystem from "expo-file-system";

// const { width } = Dimensions.get("window");

// const ProfileScreen = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile_no: "",
//     address: "",
//     registration_id: "",
//   });
//   const [image, setImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const scaleAnim = useRef(new Animated.Value(0.9)).current;

//   const loadProfile = async () => {
//     try {
//       const profileString = await AsyncStorage.getItem("user_profile");
//       if (profileString) {
//         const user_profile = JSON.parse(profileString);
//         setFormData({
//           name: user_profile.name || "",
//           email: user_profile.email || "",
//           mobile_no: user_profile.mobile_no || "",
//           address: user_profile.address || "",
//           registration_id: user_profile.registration_id || "",
//         });

//         if (user_profile.reg_img) {
//           setImage(user_profile.reg_img);
//         }
//       }
//     } catch (error) {
//       console.error("Error loading profile:", error);
//       Alert.alert("Error", "Failed to load profile data");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await loadProfile();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 500,
//       easing: Easing.out(Easing.quad),
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadProfile();
//     setRefreshing(false);
//   };

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);
//       }
//     } catch (error) {
//       console.error("Image picker error:", error);
//       Alert.alert("Error", "Failed to pick image");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.email || !formData.mobile_no) {
//       Alert.alert("Error", "Please fill all required fields");
//       return;
//     }

//     try {
//       setIsUpdating(true);
//       const formDataToSend = new FormData();

//       formDataToSend.append("registration_id", formData.registration_id);
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("mobile_no", formData.mobile_no);
//       formDataToSend.append("address", formData.address || "");

//       if (image && !image.startsWith("http")) {
//         const fileInfo = await FileSystem.getInfoAsync(image);
//         if (fileInfo.exists) {
//           const fileType = image.split(".").pop();
//           formDataToSend.append("reg_img", {
//             uri: image,
//             name: `profile.${fileType}`,
//             type: `image/${fileType}`,
//           });
//         }
//       }

//       const response = await axios.post(
//         "https://nvwebsoft.com/php_api/api.php/update_profile",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data && response?.data?.message == true) {
//         const updatedProfile = {
//           ...formData,
//           reg_img: response.data.image_url || image,
//         };

//         await AsyncStorage.setItem(
//           "user_profile",
//           JSON.stringify(updatedProfile)
//         );

//         setFormData(updatedProfile);
//         setImage(`${updatedProfile.reg_img}?t=${new Date().getTime()}`);

//         Alert.alert("Success", "Profile updated successfully");
//       } else {
//         Alert.alert(
//           "Error",
//           response?.data?.message || "Failed to update profile"
//         );
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       Alert.alert("Error", "An error occurred while updating profile");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={[styles.container, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#49B1C5" />
//       </View>
//     );
//   }

//   return (
//     <Animated.View
//       style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <View style={styles.profileHeader}>
//           {/* <TouchableOpacity
//             onPress={logoutHandler}
//             style={{ marginStart: "auto" }}
//           >
//             <MaterialIcons
//               name="logout"
//               size={25}
//               style={{
//                 color: "white",
//                 backgroundColor: "#49B1C5",
//                 marginEnd: 20,
//                 marginTop: allConstant.os === "ios" ? 15 : 0,
//               }}
//             />
//           </TouchableOpacity> */}

//           <View style={styles.avatarContainer}>
//             <TouchableOpacity
//               onPress={() =>
//                 router.push({
//                   pathname: "/(auth)/showimage",
//                   params: {
//                     image_path: `https://nvwebsoft.com/php_api/assets/website_upload/registration/${image}`,
//                   },
//                 })
//               }
//             >
//               <Image
//                 source={{
//                   uri:
//                     `https://nvwebsoft.com/php_api/assets/website_upload/registration/${image}` ||
//                     "https://randomuser.me/api/portraits/men/1.jpg",
//                 }}
//                 style={styles.profileImage}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={pickImage}>
//               <View style={styles.cameraIcon}>
//                 <Ionicons name="camera" size={20} color="white" />
//               </View>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.name}>{formData.name}</Text>
//           <Text style={styles.email}>{formData.email}</Text>

//           <View style={styles.ratingContainer}>
//             <FontAwesome name="star" size={16} color="#FFD700" />
//             <Text style={styles.ratingText}>4.8 (128 reviews)</Text>
//           </View>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.card}>
//             <Text style={styles.label}>Full Name</Text>
//             <View style={styles.inputWrapper}>
//               <Ionicons
//                 name="person"
//                 size={22}
//                 color="#6b7280"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.input}
//                 value={formData.name}
//                 onChangeText={(text) => handleChange("name", text)}
//                 placeholder="Enter your full name"
//               />
//             </View>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Email Address</Text>
//             <View style={styles.inputWrapper}>
//               <MaterialIcons
//                 name="email"
//                 size={22}
//                 color="#6b7280"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.input}
//                 value={formData.email}
//                 onChangeText={(text) => handleChange("email", text)}
//                 placeholder="Enter your email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 editable={formData.email ? false : true}
//               />
//             </View>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Mobile Number</Text>
//             <View style={styles.inputWrapper}>
//               <Ionicons
//                 name="call"
//                 size={22}
//                 color="#6b7280"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.input}
//                 value={formData.mobile_no}
//                 onChangeText={(text) => handleChange("mobile_no", text)}
//                 placeholder="Enter your mobile number"
//                 keyboardType="phone-pad"
//               />
//             </View>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Address</Text>
//             <View style={styles.inputWrapper}>
//               <Ionicons
//                 name="location"
//                 size={22}
//                 color="#6b7280"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={[styles.input]}
//                 value={formData.address}
//                 onChangeText={(text) => handleChange("address", text)}
//                 placeholder="Enter your address"
//                 multiline
//                 textAlignVertical="top"
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.saveButton}
//             onPress={handleSubmit}
//             activeOpacity={0.8}
//             disabled={isUpdating}
//           >
//             {isUpdating ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <>
//                 <Text style={styles.saveButtonText}>Update Profile</Text>
//                 <Ionicons name="arrow-forward" size={22} color="white" />
//               </>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//     borderWidth: 1,
//     margin: 0,
//     padding: 0,
//   },
//   loadingContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scrollContainer: {
//     paddingBottom: 40,
//   },
//   profileHeader: {
//     alignItems: "center",
//     paddingVertical: 30,
//     backgroundColor: "#49B1C5",
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   avatarContainer: {
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: "rgba(255,255,255,0.3)",
//   },
//   cameraIcon: {
//     position: "absolute",
//     bottom: 5,
//     right: 5,
//     backgroundColor: "#49B1C5",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "white",
//     marginTop: 15,
//     marginBottom: 5,
//   },
//   email: {
//     fontSize: 16,
//     color: "rgba(255,255,255,0.9)",
//     marginBottom: 10,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginTop: 5,
//   },
//   ratingText: {
//     color: "white",
//     fontSize: 14,
//     marginLeft: 5,
//     fontWeight: "500",
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#475569",
//     marginBottom: 10,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderColor: "#e2e8f0",
//     paddingBottom: 8,
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 8,
//     fontSize: 16,
//     color: "#334155",
//   },
//   saveButton: {
//     backgroundColor: "#49B1C5",
//     padding: 18,
//     borderRadius: 12,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//     shadowColor: "#3b82f6",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     marginRight: 10,
//   },
// });

// export default ProfileScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    address: "",
    registration_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadProfile = async () => {
    try {
      const profileString = await AsyncStorage.getItem("user_profile");
      if (profileString) {
        const user_profile = JSON.parse(profileString);
        setFormData({
          name: user_profile.name || "",
          email: user_profile.email || "",
          mobile_no: user_profile.mobile_no || "",
          address: user_profile.address || "",
          registration_id: user_profile.registration_id || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      Alert.alert("Error", "Failed to load profile data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadProfile();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.mobile_no) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      setIsUpdating(true);
      const formDataToSend = new FormData();
      formDataToSend.append("registration_id", formData.registration_id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile_no", formData.mobile_no);
      formDataToSend.append("address", formData.address || "");

      const response = await axios.post(
        "https://nvwebsoft.com/php_api/api.php/update_profile",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data);
      if (response.data?.message == true) {
        const updatedProfile = { ...formData };
        await AsyncStorage.setItem(
          "user_profile",
          JSON.stringify(updatedProfile)
        );
        setFormData(updatedProfile);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert(
          "Error",
          response?.data?.message || "Failed to update profile"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#49B1C5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Ubuntu-Bold",
            color: "#003463",
          }}
        >
          Update User Profile
        </Text>
      </View>
      <View>
        <Image
          source={require("../../assets/images/profile.png")}
          resizeMode="contain"
          style={{ height: 150, width: 150 }}
        />
      </View>

      <View style={styles.inputTextContainer}>
        <MaterialIcons
          name="person"
          size={22}
          color="#6b7280"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          value={formData?.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Enter your name"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputTextContainer}>
        <MaterialIcons
          name="email"
          size={22}
          color="#6b7280"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          value={formData?.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!formData.email}
        />
      </View>

      <View style={styles.inputTextContainer}>
        <Ionicons
          name="call"
          size={22}
          color="#6b7280"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          value={formData?.mobile_no}
          onChangeText={(text) => handleChange("mobile_no", text)}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          editable={!formData.name}
        />
      </View>

      <View style={styles.inputTextContainer}>
        <Ionicons
          name="location"
          size={22}
          color="#6b7280"
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input]}
          value={formData?.address}
          onChangeText={(text) => handleChange("address", text)}
          placeholder="Enter your address"
          multiline
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit}
        activeOpacity={0.8}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text style={styles.saveButtonText}>Update Profile</Text>
            <Ionicons name="arrow-forward" size={22} color="white" />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "#fff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  inputTextContainer: {
    boxShadow:
      "2px 2px 4px rgba(0,0,0,0.2),inset -1px -1px 2px rgba(255,255,255,0.6)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
  },

  inputIcon: {
    marginRight: 15,
    marginHorizontal: 20,
    fontSize: 25,
    fontFamily: "Ubuntu-Light",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "#334155",
    fontFamily: "Ubuntu-Light",
  },
  saveButton: {
    backgroundColor: "#003463",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Ubuntu-Light",
    marginRight: 10,
  },
});

export default ProfileScreen;
