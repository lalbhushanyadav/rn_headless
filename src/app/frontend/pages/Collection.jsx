import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import shopifyClient from "../../../api/shopifyClient";
import ThumbnailView from "./ThumbnailView";
import GridView from "./GridView";

const Collection = () => {
  const { handle } = useRoute().params;
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("titleAsc");
  const [isGridView, setIsGridView] = useState(true);
  const navigation = useNavigation();

  const onClickhandler = (handle) => {
    navigation.navigate("Product", { handle });
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await shopifyClient.fetchProductsByCollectionHandle(
          handle
        );
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, [handle]);

  useEffect(() => {
    let sorted = [...products];
    if (sortOption === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    else if (sortOption === "priceDesc")
      sorted.sort((a, b) => b.price - a.price);
    else if (sortOption === "titleAsc")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOption === "titleDesc")
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    setProducts(sorted);
  }, [sortOption]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.sortContainer}>
          <Picker
            selectedValue={sortOption}
            onValueChange={(itemValue) => setSortOption(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Title: A-Z" value="titleAsc" />
            <Picker.Item label="Title: Z-A" value="titleDesc" />
            <Picker.Item label="Price: Low to High" value="priceAsc" />
            <Picker.Item label="Price: High to Low" value="priceDesc" />
          </Picker>
          <Text style={styles.productCount}>{products.length} Products</Text>
        </View>

        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={[styles.viewButton, isGridView && styles.activeViewButton]}
            onPress={() => setIsGridView(true)}
          >
            <Icon name="th" size={20} color={isGridView ? "#000" : "#888"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, !isGridView && styles.activeViewButton]}
            onPress={() => setIsGridView(false)}
          >
            <Icon name="list" size={20} color={!isGridView ? "#000" : "#888"} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        key={isGridView ? 1 : 0}
        numColumns={isGridView ? 2 : 1}
        columnWrapperStyle={isGridView && styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          isGridView ? (
            <GridView
              data={item}
              customHandleEvent={() => onClickhandler(item.handle)}
              showPrice={true}
            />
          ) : (
            <ThumbnailView
              data={item}
              customHandleEvent={() => onClickhandler(item.handle)}
              showPrice={true}
            />
          )
        }
        keyExtractor={(item, index) => item.handle || index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 2, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sortContainer: {
    flexDirection: "column",
  },
  picker: {
    height: 40,
    width: 160,
  },
  productCount: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
  viewButtons: {
    flexDirection: "row",
  },
  viewButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  activeViewButton: {
    backgroundColor: "#ddd",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default Collection;
