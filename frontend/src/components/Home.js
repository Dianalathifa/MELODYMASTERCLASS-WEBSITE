import React from "react";
import BannerBackground from "../assets/background.png";
import BannerImage from "../assets/home-banner-image.png";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const redirectToCoursePage = () => {
    // Ganti URL berikut dengan URL halaman course yang diinginkan
    window.location.href = '/course';
  };
  return (
    <div className="home-container">
      <Navbar />

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Welcome to Melody Master Class
          </h1>
          <p className="primary-text">
          Enjoy music lessons with your favorite mentor          
          </p>
          <button className="secondary-button" onClick={redirectToCoursePage}>
              Get for free <FiArrowRight />
            </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Home;
