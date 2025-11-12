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
import UnauthPage from "./components/UnauthPage/UnauthPage";

function App() {
  const ProtectedRoute = ({ children, requiredRole, userRole }) => {
    if (userRole !== requiredRole) {
      return <Navigate to="/unauth" replace />;
    }
    return children;
  };

  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage setUserRole={setUserRole} />} />

        <Route
          path="/mainPage"
          element={
            <ProtectedRoute requiredRole="user" userRole={userRole}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute requiredRole="user" userRole={userRole}>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant"
          element={
            <ProtectedRoute requiredRole="user" userRole={userRole}>
              <RestaurantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiences"
          element={
            <ProtectedRoute requiredRole="user" userRole={userRole}>
              <ExperienceVenice />
            </ProtectedRoute>
          }
        />
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
        <Route path="/unauth" element={<UnauthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
