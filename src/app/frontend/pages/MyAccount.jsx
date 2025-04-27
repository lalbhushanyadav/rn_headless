import React from "react";
import { View, Text } from "react-native";
import MasterLayout from "../Layouts/MasterLayout.jsx";
const MyAccount = () => {
  return (
    <MasterLayout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>My Account Page!</Text>
      </View>
    </MasterLayout>
  );
};

export default MyAccount;
