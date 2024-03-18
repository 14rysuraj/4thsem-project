import { useContext, useState } from "react";
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
import Profile from "./components/profile/Profile";
import Edit from "./components/Edit/Edit";
import LoginLayout from "./components/LoginLayout";
import Search from "./components/Search/Search";
import Admin from "./components/Admin/Admin";
import UserDetail from "./components/Admin/UserDetail";
import ManageTicket from "./components/Admin/ManageTicket";
import Dashboard from "./components/Admin/Dashboard";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import EditTicket from "./components/Admin/EditTicket";
import TicketEdit from "./components/Admin/TicketEdit";
import { adminContext, context } from "./main";
import { useCookies } from "react-cookie";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { setIsAuthenticated } = useContext(context);
  const [cookies, setCookies] = useCookies(["token", "admintoken"]);
  const { isAdminAuthenticated, setIsAdminAuthenticated } =
    useContext(adminContext);

  const admin = localStorage.getItem("admintoken");
  if (admin) {
    setIsAdminAuthenticated(true);
  } else {
    setIsAdminAuthenticated(false);
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
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
            <Route path="/adminlogin" Component={AdminLogin} />
          </Route>

          <Route
            path="/admin"
            element={isAdminAuthenticated ? <Admin /> : <AdminLogin />}
          >
            <Route path="/admin/dashboard" Component={Dashboard} />
            <Route path="/admin/userdetails" Component={UserDetail} />
            <Route path="/admin/ticketedit/:id" Component={TicketEdit} />
            <Route path="/admin/managetickets" Component={ManageTicket}>
              <Route path="/admin/managetickets/edit" Component={EditTicket} />
            </Route>
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </BrowserRouter>
    </>
  );
}

export default App;
