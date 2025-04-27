import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MasterLayout from "../Layouts/MasterLayout.jsx"; // Importing MasterLayout

const Home = () => {
  return (
    <MasterLayout>
      <View style={styles.container}>
        <Text>Welcome to the Home Page!</Text>
      </View>
    </MasterLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
