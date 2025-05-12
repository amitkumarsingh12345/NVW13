import { Platform } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import { allConstant } from "../constants/Constant";

// Logo

const logoStyle = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 5,
    marginBottom: 20,
    paddingBottom: 15,
  },
  logo: {
    width: "100%",
    height: 50,
  },
});

// Notification Card

const notificationCard = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
    marginTop: allConstant.os == "ios" ? -30 : 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  leftAvatar: {
    backgroundColor: "purple",
    marginRight: 10,
  },
  rightAvatar: {
    backgroundColor: "red",
    marginLeft: 10,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
});

// Bottom Sheet

const bottomSheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },

  listContainer: {
    flex: 1,
    padding: 25,
    paddingTop: 5,
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: "#666",
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  listIcon: {
    fontSize: 20,
    color: "#666",
    width: 40,
  },
  listLabel: {
    fontSize: 15,
    paddingVertical: allConstant.os == "ios" ? 6 : 2,
  },
});

export { logoStyle, notificationCard, bottomSheet };
