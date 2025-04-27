import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Navbar() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <TouchableOpacity>
        <Text style={{ color: "white", fontWeight: "bold" }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Collections</Text>
        <Ionicons
          name="chevron-down"
          size={16}
          color="white"
          style={{ marginLeft: 4 }}
        />
      </TouchableOpacity>
    </View>
  );
}
