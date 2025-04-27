import React from "react";
import { View, SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FrontendHeader from "./Header.jsx"; // The header for the app
import FrontendFooter from "./Footer.jsx"; // Optional footer if needed
import ThemeSwitcher from "../../../shared/ThemeSwitcher.jsx";
const MasterLayout = ({ children }) => {
  //   console.log(children);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FrontendHeader />

      <View style={styles.content}>{children}</View>

      <FrontendFooter />
      <ThemeSwitcher />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Or your preferred background color
  },
  content: {
    flex: 1,
    padding: 20, // Adjust padding based on your UI design
  },
});

export default MasterLayout;
