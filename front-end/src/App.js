import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layouts/Navbar";
import Theme from "./components/layouts/Theme";
import { ThemeProvider } from "./components/context/ThemeProvider";

function App() {
  return (
    <>
      <Router>
        <ThemeProvider>
          <Theme />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
