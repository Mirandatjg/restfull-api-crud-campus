import React, { createContext, useState } from "react";

export const themecontex = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <themecontex.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </themecontex.Provider>
  );
}
