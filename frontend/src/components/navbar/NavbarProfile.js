import React, { useState } from "react";
import Logo from "./Logo.png";
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
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false); // State untuk menampilkan menu profil
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

  const handleProfileClick = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  const handleLogout = () => {
    // Tambahkan logika logout di sini
    console.log("Logout logic");
  };

  return (
    <div>
      <nav className="fixed-navbar">
        <div className="nav-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="navbar-links-container">
          {menuOptions.map((item) => (
            <a key={item.text} href={item.link}>
              {item.text}
            </a>
          ))}
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

        {/* Menampilkan Avatar (Logo Profil) */}
        <IconButton onClick={handleProfileClick}>
          <Avatar alt="User Avatar" src="/path/to/user-avatar.jpg" />
        </IconButton>

        {/* Menu Profil */}
        {openProfileMenu && (
          <Box
            sx={{ position: "absolute", top: "50px", right: "10px", zIndex: 1, backgroundColor: "white" }}
            role="presentation"
            onClick={() => setOpenProfileMenu(false)}
            onKeyDown={() => setOpenProfileMenu(false)}
          >
            <List>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Box>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
