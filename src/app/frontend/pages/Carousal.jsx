import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Button from "./Button"; // Assuming Button is a custom component

export default function HeroCarousel({ carouselItems = [], navigate }) {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        loop={true}
        autoplay={true}
        paginationStyle={styles.pagination}
        activeDotColor="#1f2937" // Dark color for active dots
        dotColor="rgba(255, 255, 255, 0.5)" // Light color for inactive dots
        showsPagination={true}
      >
        {carouselItems.map((item) => (
          <View key={item.id} style={styles.slide}>
            <TouchableOpacity
              onPress={() => navigate(`/collection/${item.handle}`)}
              style={styles.touchable}
            >
              {/* Text */}
              <View style={styles.textContainer}>
                <Text style={styles.newArrival}>New Arrival</Text>
                <Text style={styles.title}>
                  {item.title}
                  <Text style={styles.subtitle}> {item.subtitle}</Text>
                </Text>
                <Button style={styles.button}>SHOP NOW</Button>
              </View>

              {/* Image */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageLeft }} style={styles.image} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400, // Adjust based on the space you want the carousel to occupy
  },
  swiper: {
    height: "100%",
  },
  pagination: {
    bottom: 10,
  },
  slide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  newArrival: {
    fontSize: 14,
    color: "#6B7280", // Gray text color
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#374151", // Dark text color
  },
  subtitle: {
    fontSize: 18,
    color: "#4B5563", // Slightly lighter color
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#374151", // Dark button color
    borderRadius: 5,
    color: "#fff",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250, // Adjust the image height as needed
    borderRadius: 10,
    resizeMode: "cover",
  },
});
