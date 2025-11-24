import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddPreset from "./pages/AddPreset";
import EditPreset from "./pages/EditPreset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-preset" element={<AddPreset />} />
        <Route path="/edit/:id" element={<EditPreset />} />
      </Routes>
    </Router>
  );
}

export default App;
