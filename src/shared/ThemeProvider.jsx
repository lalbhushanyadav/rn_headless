import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from "react-native-paper";
import { View, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const fadeAnim = useMemo(() => new Animated.Value(1), []);

  const theme = useMemo(
    () => (isDarkTheme ? DarkTheme : DefaultTheme),
    [isDarkTheme]
  );

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "dark") {
        setIsDarkTheme(true);
        updateHtmlClass(true);
      }
    };
    loadTheme();
  }, []);

  const updateHtmlClass = (isDark) => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.classList.toggle("dark", isDark);
      html.classList.toggle("light", !isDark);
    }
  };

  const toggleTheme = async () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    updateHtmlClass(newTheme);
    await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <PaperProvider theme={theme}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          {children}
        </Animated.View>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
