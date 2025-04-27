import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
import UiMessages from "../../../shared/uiMessages";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/userSlice.js";
import { useSnackbar } from "../../../shared/SnackbarContext.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  // Get authentication state from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "black",
        justifyContent: "space-between",
      }}
    >
      {/* Left - Logo */}
      <TouchableOpacity
        onPress={() => {
          setUserMenuVisible(false);
          navigation.navigate("Home");
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
          {UiMessages.Menu.Home}
        </Text>
      </TouchableOpacity>

      {/* Middle - Navbar */}
      <Navbar />

      {/* Right - Icons */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          position: "relative",
        }}
      >
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>

        {/* User Icon */}
        <TouchableOpacity onPress={() => setUserMenuVisible((prev) => !prev)}>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>

        {/* User Menu Dropdown */}
        {userMenuVisible && (
          <View
            style={{
              position: "absolute",
              top: 40, // little below the icons
              right: 40, // adjust it based on your needs
              backgroundColor: "black",
              padding: 8,
              borderRadius: 8,
              zIndex: 999,
            }}
          >
            {/* Conditional rendering for logged in/out user */}
            {isAuthenticated ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setUserMenuVisible(false);
                    navigation.navigate("MyAccount");
                  }}
                >
                  <Text style={{ color: "white", marginVertical: 4 }}>
                    {UiMessages.Menu.MyAccount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    setUserMenuVisible(false);
                    dispatch(logout()); // Dispatch logout action
                    showSnackbar(UiMessages.Auth.logoutSuccess, "success");

                    // Setting session data to AsyncStorage
                    try {
                      await AsyncStorage.setItem(
                        "session_data",
                        JSON.stringify({
                          user: null, // Make sure 'customer' is properly defined
                          isUserType: UiMessages.User.normalUser,
                          isAuthenticated: false, // Set to false for logout
                        })
                      );
                      // After saving session data, navigate to Home
                      navigation.navigate("Home"); // Navigate to Home after logout
                    } catch (error) {
                      console.error("Error saving session data:", error);
                      showSnackbar(
                        "Error logging out. Please try again.",
                        "error"
                      );
                    }
                  }}
                >
                  <Text style={{ color: "white", marginVertical: 4 }}>
                    {UiMessages.Menu.Logout}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setUserMenuVisible(false);
                    navigation.navigate("Register");
                  }}
                >
                  <Text style={{ color: "white", marginVertical: 4 }}>
                    {UiMessages.Menu.Register}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setUserMenuVisible(false);
                    navigation.navigate("Login");
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginVertical: 4,
                    }}
                  >
                    {UiMessages.Menu.Login}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <TouchableOpacity style={{ position: "relative" }}>
          <MaterialIcons
            name="shopping-cart-checkout"
            size={24}
            color="white"
          />
          {/* Cart badge */}
          <View
            style={{
              position: "absolute",
              top: -6,
              right: -10,
              backgroundColor: "white",
              borderRadius: 8,
              paddingHorizontal: 4,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>1</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
