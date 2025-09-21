import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/homeUser/Home";
import DetailsPage from "./components/Details/DetailsPage";
import AdminPage from "./components/Admin/AdminPage";
import BookingPage from "./components/BookingPage/BookingPage";
import LandingPage from "./components/Login/LandingPage";
import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminHome" element={<AdminPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
