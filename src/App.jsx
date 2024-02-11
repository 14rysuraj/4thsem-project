import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/login";
import Book from "./components/Book/Book";
import TicketStatus from "./components/TicketStautus/TicketStatus";
import Layout from "./components/Layout";
import Register from "./components/Register/Register";
import Payment from "./components/Payment/Payment";
import { Toaster } from "react-hot-toast";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      
        <Routes>
          <Route path="/" Component={Layout}>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/book" Component={Book} />
          <Route path="/ticketstatus" Component={TicketStatus} />
            <Route path="/contact" Component={Contact} />
            <Route path="/myprofile" Component={Profile}/>
          </Route>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/payment" Component={Payment}/>
          
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </>
  );
}

export default App;
