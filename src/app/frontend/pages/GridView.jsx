import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const GridView = ({ data, customHandleEvent, showPrice }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={customHandleEvent}>
        <Image
          source={{ uri: data.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={customHandleEvent}>
        <Text style={styles.title} numberOfLines={2}>
          {data.title}
        </Text>
      </TouchableOpacity>

      {showPrice && (
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${data.price}</Text>
          <Text style={styles.compareAtPrice}>${data.compareAtPrice}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937", // Tailwind text-gray-800
    textAlign: "center",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginRight: 8,
  },
  compareAtPrice: {
    fontSize: 14,
    color: "#9CA3AF", // Tailwind text-gray-400
    textDecorationLine: "line-through",
  },
});

export default GridView;
