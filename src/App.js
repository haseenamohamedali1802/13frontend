import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Screens/Home";
import Header from "./components/Header";
import EditApplicant from "./components/Screens/EditApplicant";
import Stats from "./components/Screens/Stats";
import LoginScreen from "./components/Screens/LoginScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editApplicant/:id" element={<EditApplicant />} />
        <Route path="/StatisticsCollection/" element={<Stats />} />
        <Route path="/login/" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
