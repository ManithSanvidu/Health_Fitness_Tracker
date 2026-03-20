import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FitnessForm from "./pages/FitnessForm.jsx";
import Login from "./pages/Login.jsx";
import Nutrition from "./pages/Nutrition.jsx";
import Profile from "./pages/Profile.jsx";
import WorkoutPlans from "./pages/WorkoutPlans.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/recommend" element={<FitnessForm />}></Route>
        <Route path="/workouts" element={<WorkoutPlans />}></Route>
        <Route path="/nutrtion" element={<Nutrition />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
