import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { themecontex } from "../context/ThemeProvider";

function Navbar() {
  const redirect = useNavigate();
  const url = useLocation();

  const mycontex = useContext(themecontex);

  return (
    <nav className={(mycontex.darkMode) ? "nav dark-mode" : "nav"}>
      <span className="logo">RESTFULL-API-CRUD-CAMPUS</span>

      {/* User */}
      <div className="user">
        {localStorage.getItem("token") ? (
          <>
            <span>Muhammad Riski Fauzi</span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                redirect("/login");
              }}
            >
              Keluar
            </button>
          </>
        ) : url.pathname == "/login" ? (
          <button
            type="button"
            onClick={() => {
              redirect("/register");
            }}
          >
            Register
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              redirect("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
