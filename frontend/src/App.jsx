import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/homeUser/Home";
import AdminPage from "./components/Admin/AdminPage";
import BookingPage from "./components/BookingPage/BookingPage";
import LandingPage from "./components/Login/LandingPage";
import MainPage from "./components/MainPage/MainPage";
import RestaurantPage from "./components/Restaurant/RestaurantPage";
import ExperienceVenice from "./components/ExperienceVenice/ExperienceVenice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminHome" element={<AdminPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/experiences" element={<ExperienceVenice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
