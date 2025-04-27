import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSnackbar } from "../../../shared/SnackbarContext.jsx";
import UiMessages from "../../../shared/uiMessages.js"; // Assuming GlobalTexts provides error messages
import shopifyClient from "../../../api/shopifyClient.js";
import MasterLayout from "../Layouts/MasterLayout.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/userSlice.js";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const { navigate } = useNavigation();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch(); // Make sure you're dispatching correctly

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      validation: () => {
        if (!formData.email) return UiMessages.Auth.emailMandatoryError;
        if (!/\S+@\S+\.\S+/.test(formData.email))
          return UiMessages.Auth.emailValidError;
        return null;
      },
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      validation: () => {
        if (!formData.password) return UiMessages.Auth.passwordMandatoryError;
        return null;
      },
    },
  ];

  const handleChange = useCallback((e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(({ id, validation }) => {
      const error = validation();
      if (error) newErrors[id] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Step 1: Login the user
      const tokenData = await shopifyClient.loginUser(
        formData.email,
        formData.password
      );

      // Step 2: Validate if the token exists and is valid
      const accessToken = tokenData.accessToken;
      if (!accessToken || accessToken.trim() === "") {
        throw new Error(UiMessages.Auth.loginError);
      }

      await AsyncStorage.setItem("accessToken", accessToken);

      // Step 3: Get customer details
      const customer = await shopifyClient.getCustomerDetails(accessToken);

      if (!customer) {
        setErrorMessage("Failed to fetch customer details.");
        showSnackbar("Failed to fetch customer details.", "error");
        return; // exit here if customer not found
      }

      let storeData = {
        user: customer,
        isUserType: UiMessages.User.frontendUser,
        isAuthenticated: true,
      };
      console.log(storeData);

      // Step 4: Update Redux store
      dispatch(setUserData(storeData));

      // Step 5: Save to AsyncStorage
      await AsyncStorage.setItem("session_data", JSON.stringify(storeData));

      // Step 6: Show success message
      showSnackbar(UiMessages.Auth.loginSuccess, "success");

      // Step 7: Redirect to My Account page
      navigate("MyAccount"); // Use navigation to go to the account page
    } catch (error) {
      setErrorMessage(error.message || UiMessages.Auth.loginError);
      showSnackbar(error.message || UiMessages.Auth.loginError, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MasterLayout>
      <View style={styles.container}>
        <Text style={styles.title}>User Login</Text>

        {fields.map((field) => (
          <View key={field.id} style={styles.inputContainer}>
            <TextInput
              label={field.label}
              value={formData[field.id]}
              onChangeText={(text) => handleChange(text, field.id)}
              style={styles.input}
              secureTextEntry={field.type === "password"}
              keyboardType={
                field.type === "email" ? "email-address" : "default"
              }
              error={!!errors[field.id]}
            />
            {errors[field.id] && (
              <Text style={styles.errorText}>{errors[field.id]}</Text>
            )}
          </View>
        ))}

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </Button>

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
          style={styles.snackbar}
        >
          {errorMessage}
        </Snackbar>
      </View>
    </MasterLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
  snackbar: {
    backgroundColor: "#f44336",
  },
});

export default Login;
