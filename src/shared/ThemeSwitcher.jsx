import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the icons
import { useTheme } from "./ThemeProvider"; // Make sure useTheme is correctly imported

const ThemeSwitcher = () => {
  const { toggleTheme, isDarkTheme } = useTheme(); // Using the theme toggle function from context

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.themeSwitcher}>
      <Ionicons
        name={isDarkTheme ? "sunny" : "moon"}
        size={24}
        color={isDarkTheme ? "yellow" : "white"}
      />
      <Text style={styles.themeSwitcherText}>
        {isDarkTheme ? "Light Mode" : "Dark Mode"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20, // Position it 20px from the bottom
    right: 20, // Position it 20px from the right
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional background color for visibility
    borderRadius: 20, // Optional rounded corners
    padding: 10, // Optional padding for the button
  },
  themeSwitcherText: {
    marginLeft: 8,
    color: "white",
    fontSize: 12, // Smaller text for the mode label
  },
});

export default ThemeSwitcher;
