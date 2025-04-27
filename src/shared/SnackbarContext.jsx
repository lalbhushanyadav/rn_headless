import React, { createContext, useState, useContext } from "react";
import { Snackbar } from "react-native-paper";

// Create a context for the Snackbar
const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext); // Custom hook to use snackbar

// Snackbar provider to wrap your app
export const SnackbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [actionLabel, setActionLabel] = useState("");
  const [actionHandler, setActionHandler] = useState(() => () => {});
  const [type, setType] = useState("info"); // Default to 'info'

  // Now only require type and message, actionText and onActionPress are optional
  const showSnackbar = (
    msg,
    snackbarType = "info",
    actionText = "",
    onActionPress = () => {}
  ) => {
    setMessage(msg);
    setActionLabel(actionText);
    setActionHandler(() => onActionPress);
    setType(snackbarType); // Set the type (success, error, info)
    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
  };

  // Define colors for different types
  const getSnackbarColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50"; // Green
      case "error":
        return "#F44336"; // Red
      case "info":
        return "#2196F3"; // Blue
      default:
        return "#2196F3"; // Default to info color
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideSnackbar}
        action={{
          label: actionLabel,
          onPress: actionHandler,
        }}
        style={{ backgroundColor: getSnackbarColor() }} // Apply color based on type
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
