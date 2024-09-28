import React from "react";
import "./App.css";
import Signup from "./auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar /> {/* Move Navbar outside of Routes */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/auth/signup" element={<Signup />} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
