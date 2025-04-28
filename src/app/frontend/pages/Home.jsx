import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import MasterLayout from "../Layouts/MasterLayout"; // Importing MasterLayout
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Using AsyncStorage for React Native
import TextSection from "../Layouts/TextSection";
import SectionDescription from "../Layouts/SectionDescription";

const Home = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [carousalLoading, setCarousalLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const dummyImages = (seed, count, size = 300) =>
    Array.from(
      { length: count },
      (_, i) => `https://picsum.photos/seed/${seed}${i}/${size}/${size}`
    );
  useEffect(() => {
    // This is for the homepageCarousel
    const fetchCarousel = async () => {
      try {
        const items = Array.from({ length: 3 }, (_, i) => ({
          id: i + 1,
          title: `Featured Item ${i + 1}`,
          subtitle: `Category ${i + 1}`,
          imageLeft: dummyImages("left", 3)[i], // Dummy image logic
        }));
        setCarouselItems(items);
      } catch (err) {
        console.error("Error loading carousel:", err);
      } finally {
        setTimeout(() => setCarousalLoading(false), 1000);
      }
    };

    fetchCarousel();

    // Fetching collections from AsyncStorage (localStorage equivalent)
    const fetchCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem("shop_collections");
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const welcomeText = {
    subtitle: "Who Are We",
    title: "Welcome To Demo.",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt labor et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat irure.`,
  };

  const blogText = {
    subtitle: "",
    title: "OUR BLOG",
    description: `Lorem ipsum dolor sit amet...`,
  };

  return (
    <MasterLayout>
      {/* Swiper component for carousel */}
      <Swiper showsPagination={false} loop>
        {carousalLoading ? (
          <View style={styles.carouselItem}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          carouselItems.map((item) => (
            <View key={item.id} style={styles.carouselItem}>
              <Image
                source={{ uri: item.imageLeft }} // Assuming image is a URL
                style={styles.carouselImage}
              />
              <Text style={styles.carouselTitle}>{item.title}</Text>
              <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
            </View>
          ))
        )}
      </Swiper>

      <View style={styles.container}>
        <SectionDescription sections={categories} isCarousel={true} />

        {/* Blog section */}
        <TextSection {...welcomeText} />
      </View>
    </MasterLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  carouselSubtitle: {
    fontSize: 18,
    color: "#666",
  },
});

export default Home;
