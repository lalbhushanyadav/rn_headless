import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSnackbar } from "../../../shared/SnackbarContext.jsx";
import UiMessages from "../../../shared/uiMessages.js";
import shopifyClient from "../../../api/shopifyClient.js";
import MasterLayout from "../Layouts/MasterLayout.jsx";
// import Login from "./Login.jsx";

const Register = () => {
  const navigation = useNavigation();
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fields = [
    {
      id: "firstName",
      label: "First Name",
      validation: () => {
        if (!formData.firstName) return "First name is required.";
        return null;
      },
    },
    {
      id: "lastName",
      label: "Last Name",
      validation: () => {
        if (!formData.lastName) return "Last name is required.";
        return null;
      },
    },
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
        if (formData.password.length < 6)
          return "Password must be at least 6 characters.";
        return null;
      },
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      validation: () => {
        if (formData.confirmPassword !== formData.password)
          return "Passwords do not match.";
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
      // Assuming you have a registerUser method in shopifyClient
      const customer = await shopifyClient.createCustomer(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      if (customer?.error) {
        console.log("hello");
        showSnackbar(customer.error, "error");
        return;
      }
      showSnackbar(UiMessages.Auth.registrationSuccess, "success");
      navigation.navigate("Login");
    } catch (error) {
      showSnackbar(Ui.Auth.registrationError, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MasterLayout>
      <View style={styles.container}>
        <Text style={styles.title}>User Registration</Text>

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
          {isSubmitting ? "Registering..." : "Register"}
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

export default Register;
