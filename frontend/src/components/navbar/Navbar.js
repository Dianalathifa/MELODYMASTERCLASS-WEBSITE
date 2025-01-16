import React, { useState } from "react";
// import { Link } from 'react-router-dom'; // Mengimpor Link dari react-router-dom
import Logo from "./Logo.png";
// import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import People from "@mui/icons-material/People";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
// import classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";

// import {CButton} from '@coreui/react';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();
  const menuOptions = [
    {
      link: "/Home",
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "Course",
      icon: <BookIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "About Us",
      icon: <InfoIcon />,
    },
    {
      text: "User Data",
      icon: <People />,
    },
    
  ];

  return (
    <div>
       <nav className="fixed-navbar">
        <div className="nav-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="navbar-links-container">
          <a href="/Home">Home</a>
          <a href="/Course">Course</a>
          {/* <a href="/Testimonial">Testimonials</a> */}
          <a href="/About">About</a>
          <a href="/SignIn">Sign In</a>
          <Link to="/register">
          <Button type="submit" style={{ backgroundColor: '#AA72C3', borderColor: '#AA72C3'}}>{t("Sign Up")}</Button>
          </Link>
        </div>
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </nav>
    </div>
  );
};

export default Navbar;
