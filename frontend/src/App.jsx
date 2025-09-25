import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Rooms from "./components/Rooms/Rooms";
import AdminPage from "./components/Admin/AdminPage";
import MainPage from "./components/MainPage/MainPage";
import RestaurantPage from "./components/Restaurant/RestaurantPage";
import ExperienceVenice from "./components/ExperienceVenice/ExperienceVenice";
import EntryPage from "./components/LoginRegister/EntryPage";
import UserManagment from "./components/Admin/UserManagment";
import RoomManagment from "./components/Admin/RoomManagment";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { useState } from "react";

function App() {
  const ProtectedRoute = ({ children, requiredRole, userRole }) => {
    if (userRole !== requiredRole) {
      return <Navigate to="/*" replace />;
    }
    return children;
  };

  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "user");
  console.log(userRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage setUserRole={setUserRole} />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/experiences" element={<ExperienceVenice />} />
        <Route
          path="/adminHome"
          element={
            <ProtectedRoute requiredRole="admin" userRole={userRole}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roomManager"
          element={
            <ProtectedRoute requiredRole="admin" userRole={userRole}>
              <RoomManagment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userManager"
          element={
            <ProtectedRoute requiredRole="admin" userRole={userRole}>
              <UserManagment />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
