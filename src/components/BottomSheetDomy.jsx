import React, { useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  MaterialIcons as MDIcon,
  FontAwesome as FAIcon,
} from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

const App = () => {
  const refStandard = useRef();
  const refScrollable = useRef();
  const refDatePicker = useRef();
  const refInput = useRef();
  const refMessage = useRef();

  // Data moved from list.json to component
  const listData = [
    { icon: "insert-drive-file", label: "Document" },
    { icon: "photo-camera", label: "Camera" },
    { icon: "photo", label: "Gallery" },
    { icon: "headset", label: "Audio" },
    { icon: "location-on", label: "Location" },
    { icon: "person", label: "Contact" },
  ];

  const gridData = [
    { icon: "facebook", label: "Facebook", color: "#3b5998" },
    { icon: "twitter", label: "Twitter", color: "#1da1f2" },
    { icon: "youtube-play", label: "Youtube", color: "#ff0000" },
    { icon: "instagram", label: "Instagram", color: "#c32aa3" },
    { icon: "whatsapp", label: "Whatsapp", color: "#25d366" },
    { icon: "google", label: "Google", color: "#4285f4" },
    { icon: "spotify", label: "Spotify", color: "#1ed760" },
    { icon: "amazon", label: "Amazon", color: "#ff9900" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>REACT NATIVE RAW BOTTOM SHEET</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => refStandard.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>STANDARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refScrollable.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>SCROLLABLE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refDatePicker.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>DATE PICKER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refInput.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>TEXT INPUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refMessage.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>MESSAGE</Text>
        </TouchableOpacity>
      </View>

      {/* List Menu */}
      <RBSheet ref={refStandard} draggable dragOnContent height={330}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Create</Text>
          {listData.map((list, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listButton}
              onPress={() => refStandard.current.close()}
            >
              <MDIcon name={list.icon} style={styles.listIcon} />
              <Text style={styles.listLabel}>{list.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>

      {/* Grid Menu */}
      <RBSheet
        ref={refScrollable}
        draggable
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          draggableIcon: {
            width: 80,
          },
        }}
      >
        <ScrollView>
          <View style={styles.gridContainer}>
            {gridData.map((grid, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => refScrollable.current.close()}
                style={styles.gridButtonContainer}
              >
                <View
                  style={[styles.gridButton, { backgroundColor: grid.color }]}
                >
                  <FAIcon name={grid.icon} style={styles.gridIcon} />
                </View>
                <Text style={styles.gridLabel}>{grid.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </RBSheet>

      {/* Date Picker IOS */}
      <RBSheet
        ref={refDatePicker}
        onOpen={() => console.log("RBSheet is Opened")}
        onClose={() => console.log("RBSheet is Closed")}
      >
        <View style={styles.dateHeaderContainer}>
          <TouchableOpacity
            onPress={() => refDatePicker.current.close()}
            style={styles.dateHeaderButton}
          >
            <Text style={styles.dateHeaderButtonCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refDatePicker.current.close()}
            style={[styles.dateHeaderButton]}
          >
            <Text style={styles.dateHeaderButtonDone}>Done</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/* TextInput */}
      <RBSheet
        ref={refInput}
        height={60}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: { backgroundColor: "#fff" },
        }}
      >
        <View style={styles.inputContainer}>
          <MDIcon name="photo-camera" style={styles.inputIcon} />
          <MDIcon name="tag-faces" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            autoFocus
            placeholder="Write a comment..."
          />
          <MDIcon
            name="send"
            style={[styles.inputIcon, styles.inputIconSend]}
            onPress={() => refInput.current.close()}
          />
        </View>
      </RBSheet>

      {/* Alert */}
      <RBSheet
        ref={refMessage}
        openDuration={150}
        closeDuration={100}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
        }}
      >
        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Awesome!</Text>
          <Text style={styles.message}>
            You can add your own component whatever you want. If you don't like
            our default style you can customize whatever you like.
          </Text>
          <View style={styles.messageButtonContainer}>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => refMessage.current.close()}
            >
              <Text style={styles.messageButtonText}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.messageButton, styles.messageButtonRight]}
              onPress={() => refMessage.current.close()}
            >
              <Text
                style={[
                  styles.messageButtonText,
                  styles.messageButtonTextRight,
                ]}
              >
                GREAT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

// Keep all the same styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  textTitle: {
    fontSize: 20,
    marginTop: 120,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    width: 150,
    backgroundColor: "#4EB151",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    margin: 10,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    padding: 25,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60,
  },
  listLabel: {
    fontSize: 16,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 20,
  },
  gridButtonContainer: {
    flexBasis: "25%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  gridIcon: {
    fontSize: 30,
    color: "white",
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: "#333",
  },
  dateHeaderContainer: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateHeaderButton: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dateHeaderButtonCancel: {
    fontSize: 18,
    color: "#666",
    fontWeight: "400",
  },
  dateHeaderButtonDone: {
    fontSize: 18,
    color: "#006BFF",
    fontWeight: "500",
  },
  inputContainer: {
    borderTopWidth: 1.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  inputIcon: {
    fontSize: 24,
    color: "#666",
    marginHorizontal: 5,
  },
  inputIconSend: {
    color: "#006BFF",
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 36,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginHorizontal: 10,
  },
  messageContainer: {
    flex: 1,
    padding: 25,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  message: {
    fontSize: 17,
    lineHeight: 24,
    marginVertical: 20,
  },
  messageButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  messageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#3385ff",
    marginLeft: 10,
  },
  messageButtonText: {
    color: "#3385ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageButtonRight: {
    backgroundColor: "#3385ff",
  },
  messageButtonTextRight: {
    color: "#fff",
  },
});

export default App;
