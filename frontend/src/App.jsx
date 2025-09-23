import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Rooms from "./components/Rooms/Rooms";
import AdminPage from "./components/Admin/AdminPage";
import BookingPage from "./components/BookingPage/BookingPage";
import MainPage from "./components/MainPage/MainPage";
import RestaurantPage from "./components/Restaurant/RestaurantPage";
import ExperienceVenice from "./components/ExperienceVenice/ExperienceVenice";
import EntryPage from "./components/LoginRegister/EntryPage";
import UserManagment from "./components/Admin/UserManagment";
import RoomManagment from "./components/Admin/RoomManagment";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/adminHome" element={<AdminPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/experiences" element={<ExperienceVenice />} />
        <Route path="/roomManager" element={<RoomManagment />} />
        <Route path="userManager" element={<UserManagment />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
