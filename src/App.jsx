import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/login";
import Book from "./components/Book/Book";
import TicketStatus from "./components/TicketStautus/TicketStatus";
import Layout from "./components/Layout";
import Register from "./components/Register/Register";
import { Toaster } from "react-hot-toast";
import Profile from "./components/profile/Profile";
import Edit from "./components/Edit/Edit";
import LoginLayout from "./components/LoginLayout";
import Search from "./components/Search/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" Component={Layout}>
            <Route path="/" Component={Book} />
            <Route path="/about" Component={About} />
            <Route path="/book" Component={Book} />
            <Route path="/mytickets" Component={TicketStatus} />
            <Route path="/contact" Component={Contact} />
            <Route path="/myprofile" Component={Profile} />
            <Route path="/edit" Component={Edit} />
            <Route path="/search" Component={Search} />
          </Route>
          <Route path="/" Component={LoginLayout}>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
