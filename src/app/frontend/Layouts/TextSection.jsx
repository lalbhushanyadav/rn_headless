import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TextSection = ({ subtitle, title, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        {title && <Text style={styles.title}>{title}</Text>}

        {(title || subtitle) && <View style={styles.separator} />}

        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    paddingVertical: 20,
    maxWidth: 600, // Maximum width, similar to 'max-w-3xl' in Tailwind
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563", // Tailwind's gray-600 color
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937", // Tailwind's gray-800 color
    marginTop: 10,
  },
  separator: {
    width: 48,
    height: 2,
    backgroundColor: "#1F2937", // Tailwind's gray-800 color
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#4B5563", // Tailwind's gray-600 color
    lineHeight: 24,
    textAlign: "center",
  },
});

export default TextSection;
