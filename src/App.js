import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
      <Routes>
        {/*home page without login*/}
        <Route path="/" element={<Home></Home>}></Route>
        {/* Login */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} ></Login>}></Route>
        {/* signup page*/}
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}  ></Signup>}></Route>
        {/* Dashboard Component After Login */}
        <Route path="/dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;