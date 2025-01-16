import React from "react";
import '../App.css';
import Logo from '../assets/Logo1.png'
import Bg from '../assets/background.png';

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <img
            className="background-image"
            src={Bg}
            alt="Splash Background"
        />
            <img src={Logo} alt="Logo" className="Logo" />
        </div>
    )
}

export default SplashScreen;