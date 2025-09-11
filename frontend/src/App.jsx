import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/homeUser/Home";
import DetailsPage from "./components/Details/DetailsPage";
import AdminPage from "./components/Admin/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<DetailsPage />} />
        <Route path="/adminHome" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
