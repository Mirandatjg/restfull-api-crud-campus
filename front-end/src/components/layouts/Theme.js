import React, { useContext } from "react";
import { themecontex } from "../context/ThemeProvider";

function Theme() {
  const mycontex = useContext(themecontex);

  (mycontex.darkMode) ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode')
  
  return (
    <div className={(mycontex.darkMode) ? "theme dark-mode" : "theme"}>
      <button
        type="button"
        onClick={() => {
          mycontex.setDarkMode(!mycontex.darkMode);
        }}
      >
        {mycontex.darkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default Theme;
