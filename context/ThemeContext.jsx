import React, { createContext, useState } from "react";

export const themes = {
  light: {
    primary: "#69C7F9",
    secondary: "#D1DEEA",
    background: "#FFFFFF",
    text: "#000000",
    surface: "#ECF4F9",
    error: "#FF6767",
    success: "#37E65D",
    warning: "#DFD07E",
    info: "#9A9A9A",
    disabled: "#E9E9E9",
    border: "#000000",
  },
  dark: {
    primary: "",
    secondary: "",
    background: "",
    text: "",
    surface: "",
    error: "",
    success: "",
    warning: "",
    info: "",
    disabled: "",
    border: "",
  },
};

export const ThemeContext = createContext(themes.light);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
