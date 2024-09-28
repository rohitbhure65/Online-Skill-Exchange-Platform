import React from "react";
import "./App.css";
import Signup from "./auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
    
  
};

export default App;
