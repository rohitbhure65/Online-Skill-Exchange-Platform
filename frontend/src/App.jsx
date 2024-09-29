import React from "react";
import "./App.css";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Listing from "./pages/Listing";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/page/listings" element={<Listing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
