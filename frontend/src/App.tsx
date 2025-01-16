import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
// import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import SplashScreen from "./Splashscreen/Splashscreen";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/about/About";
import Course from "./components/Course";
import Coach from "./components/Coach";
import RegisterCoach from "./components/register/RegisterCoach"
// import SignUp from "./components/register/SignUp";
import SignIn from "./components/signIn/SignIn";
import User from "./components/UserPage/User";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import FormPage from "./components/form/FormPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import Customers from "./pages/Customers";
import CustomerEdit from "./pages/CustomerEdit";
import ProductEdit from "./pages/ProductEdit";
import NotFound from "./pages/NotFound";
import BlankPage from "./pages/BlankPage";
import Materi from "./components/Materi"
import Transaksi from "./components/Transaksi";
import RegisterAdmin from "./pages/RegisterAdmin";
import DataAdmin from "./components/login/DataAdmin"
import LoginAdmin from "./components/login/LoginAdmin"
import "./scss/App.scss";
import "./App.css";
import UserPage from "./pages/UserPage";
import CoachPage1 from "./pages/CoachPage1";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <div className="app-container">
      
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/datacoach" element={<CoachPage1 />} />
                  <Route
                    path="/datacoach/:customerId"
                    element={<CustomerEdit />}
                  />
                  <Route path="/materi" element={<Materi />} />
                  <Route path="/materi/:productId" element={<ProductEdit />} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/analytics" element={<BlankPage/>} />
                  <Route path="/discount" element={<BlankPage />} />
                  <Route path="/dataAdmin" element={<DataAdmin />} />
                  <Route path="/transaksi" element={<Transaksi />} />
                </Route>
              </Route>
              <Route path="/admin" element={<RegisterAdmin />} />
              <Route path="/loginAdmin" element={<LoginAdmin />} />
              <Route path="/registeradmin" element={<RegisterAdmin />} />


              
              <Route path="/Home" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Course" element={<Course />} />
              <Route path="/Coach" element={<Coach />} />
              <Route path="/register" element={<Register />} />
              <Route path="/RegisterCoach" element={<RegisterCoach />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/User" element={<User />} />
              {/* <Route path="/Testimonial" element={<Testimonial />} /> */}
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Form" element={<FormPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
