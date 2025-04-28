import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ThumbnailView = ({ data, customHandleEvent, showPrice }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={customHandleEvent} style={styles.imageWrapper}>
        <Image
          source={{ uri: data.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.infoWrapper}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  imageWrapper: {
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937", // Tailwind text-gray-800
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: "row",
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

export default ThumbnailView;
