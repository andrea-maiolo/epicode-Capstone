import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
