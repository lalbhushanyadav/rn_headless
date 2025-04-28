import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const SectionDescription = ({ sections, isCarousel = false }) => {
  const navigation = useNavigation();

  const handleNavigate = (handle) => {
    navigation.navigate("Collection", { handle }); // Adjust based on your navigation structure
  };

  return (
    <View style={styles.container}>
      {isCarousel ? (
        <Swiper
          showsPagination
          autoplay
          loop
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          style={styles.swiper}
        >
          {sections.map((data) => (
            <TouchableOpacity
              key={data.handle}
              style={styles.slide}
              onPress={() => handleNavigate(data.handle)}
              activeOpacity={0.8}
            >
              <View style={styles.card}>
                {data.image && data.title && (
                  <Image
                    source={{ uri: data.image }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
                {data.count > 0 && (
                  <Text style={styles.productCount}>{data.count} Products</Text>
                )}
                {data.title && <Text style={styles.title}>{data.title}</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </Swiper>
      ) : (
        <View style={styles.grid}>
          {sections.map((data, index) => (
            <View key={index} style={styles.gridItem}>
              <Image
                source={{ uri: data.image }}
                style={styles.gridImage}
                resizeMode="contain"
              />
              <Text style={styles.productCount}>{data.count} Products</Text>
              <Text style={styles.title}>{data.title}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DBEAFE", // Tailwind bg-blue-100
    paddingVertical: 20,
    flex: 1,
  },
  swiper: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: 250,
    width: width * 0.8,
  },
  image: {
    height: 120,
    width: "100%",
    marginBottom: 10,
  },
  productCount: {
    fontSize: 14,
    color: "#4B5563", // Tailwind text-gray-600
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: width / 2.3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  gridImage: {
    height: 100,
    width: "100%",
    marginBottom: 10,
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default SectionDescription;
