import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
import UiMessages from "../../../shared/uiMessages";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/userSlice.js";
import { useSnackbar } from "../../../shared/SnackbarContext.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Header() {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  // Get authentication state from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <View style={styles.headerContainer}>
      {/* Left - Logo */}
      <TouchableOpacity
        onPress={() => {
          setUserMenuVisible(false);
          navigation.navigate("Home");
        }}
        style={styles.logoContainer}
      >
        <Text style={styles.logoText}>Home</Text>
      </TouchableOpacity>

      {/* Middle - Navbar */}
      <Navbar />

      {/* Right - Icons */}
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>

        {/* User Icon */}
        <TouchableOpacity onPress={() => setUserMenuVisible((prev) => !prev)}>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>

        {/* User Menu Dropdown */}
        {userMenuVisible && (
          <View style={styles.userMenuDropdown}>
            {/* Conditional rendering for logged in/out user */}
            {isAuthenticated ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setUserMenuVisible(false);
                    navigation.navigate("MyAccount");
                  }}
                >
                  <Text style={styles.menuText}>My Account</Text>
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
                  <Text style={styles.menuText}>Logout</Text>
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
                  <Text style={styles.menuText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setUserMenuVisible(false);
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.menuText}>Login</Text>
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
          <View style={styles.cartBadge}>
            <Text style={styles.cartText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "black",
    justifyContent: "space-between",
    width: "100%",
    height: Platform.OS === "ios" ? 80 : 70, // Adjust height for iOS/Android
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
  },
  rightIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    position: "relative",
  },
  userMenuDropdown: {
    position: "absolute",
    top: 40, // little below the icons
    right: 0, // right aligned
    backgroundColor: "black",
    padding: 8,
    borderRadius: 8,
    zIndex: 999,
  },
  menuText: {
    color: "white",
    marginVertical: 4,
    fontSize: 14,
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  cartText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
