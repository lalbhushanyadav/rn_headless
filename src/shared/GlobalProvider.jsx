import React from "react";
import { SnackbarProvider } from "./SnackbarContext";

function GlobalProvider({ children }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}

export default GlobalProvider;
