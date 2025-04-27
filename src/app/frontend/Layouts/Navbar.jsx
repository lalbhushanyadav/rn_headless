import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import shopifyClient from "../../../api/shopifyClient";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const loadCollections = async () => {
      const collections = await shopifyClient.fetchCollections();
      const transformed = collections.map((item) => ({
        title: item.title,
        image: item.image?.url || "",
        handle: item.handle,
      }));
      setCategories(transformed);
      await AsyncStorage.setItem(
        "shop_collections",
        JSON.stringify(transformed)
      );
    };

    loadCollections();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          style={styles.collectionsButton}
          onPress={toggleDropdown}
        >
          <Text style={styles.navText}>Collections</Text>
          {categories.length > 0 && (
            <Ionicons
              name={dropdownVisible ? "chevron-up" : "chevron-down"}
              size={16}
              color="white"
              style={{ marginLeft: 4 }}
            />
          )}
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdown}>
            <ScrollView>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.handle}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{category.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#000", // black background
  },
  navText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  collectionsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    top: 40,
    backgroundColor: "#111",
    paddingVertical: 8,
    width: 150,
    borderRadius: 8,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: "white",
    fontSize: 14,
  },
});
