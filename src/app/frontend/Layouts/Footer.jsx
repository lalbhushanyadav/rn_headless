import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation

export default function FrontendFooter() {
  const navigation = useNavigation();

  // Function to handle the Scroll to Top action
  const scrollToTop = () => {
    // Logic to scroll to the top (you can use a scrollView ref if necessary)
    console.log("Scrolling to top...");
  };

  return (
    <View style={styles.container}>
      {/* Main content of the page */}
      <ScrollView style={styles.content}>
        {/* Your homepage content will go here */}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          {/* Logo & Copyright */}
          <View style={styles.section}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.logo}>
                Demo<Text style={styles.logoSpan}>.</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.copyRight}>
              © 2025 Demo.{"\n"}All Rights Reserved
            </Text>
          </View>

          {/* About Us */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ABOUT US</Text>
            <View>
              <Text style={styles.link}>About us</Text>
              <Text style={styles.link}>Store location</Text>
              <Text style={styles.link}>Contact</Text>
              <Text style={styles.link}>Orders tracking</Text>
            </View>
          </View>

          {/* Useful Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>USEFUL LINKS</Text>
            <View>
              <Text style={styles.link}>Returns</Text>
              <Text style={styles.link}>Support Policy</Text>
              <Text style={styles.link}>Size guide</Text>
              <Text style={styles.link}>FAQs</Text>
            </View>
          </View>

          {/* Follow Us */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FOLLOW US</Text>
            <View>
              <Text style={styles.link}>Facebook</Text>
              <Text style={styles.link}>Twitter</Text>
              <Text style={styles.link}>Instagram</Text>
              <Text style={styles.link}>YouTube</Text>
            </View>
          </View>

          {/* Subscribe */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUBSCRIBE</Text>
            <Text style={styles.subscribeText}>
              Get E-mail updates about our latest shop and special offers.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address..."
              placeholderTextColor="#7F7F7F"
            />
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => console.log("Subscribed")}
            >
              <Text style={styles.subscribeButtonText}>SUBSCRIBE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scroll to top button */}
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={scrollToTop}
        >
          <Text style={styles.scrollToTopText}>⇧</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  logoSpan: {
    color: "#000",
  },
  copyRight: {
    fontSize: 12,
    color: "#7F7F7F",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  link: {
    fontSize: 14,
    color: "#1D4ED8", // Tailwind color for blue links
    marginBottom: 5,
  },
  subscribeText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: "#1D4ED8", // Tailwind blue
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollToTopButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1D4ED8",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollToTopText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
