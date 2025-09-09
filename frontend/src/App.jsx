import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/homeUser/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/admin" element={<AdminPag />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
