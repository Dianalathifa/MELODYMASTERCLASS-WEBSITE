// AdminForm.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import langContextObj from "../../store/langContext";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Login.module.scss";

function AdminForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langCtx = useContext(langContextObj);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (username === "" || password === "") {
    alert("Data Gagal ditambahkan, field tidak boleh ada yang kosong");
  } else {
    try {
      // Use GET request instead of POST request
      await axios.get("http://localhost:8080/admin", {
        params: {
          username: username,
          password: password,
        },
      });

      // Simulate a successful login, you may want to use a state variable to track login status
      alert("Login successful!");

      // Redirect to home page or any other desired page upon successful login
      window.location.href = "/";
    } catch (error) {
      console.error("Error login admin:", error);
      // Handle login error (e.g., display an error message)
      alert("Login failed. Please check your credentials.");
    }
  }
};
  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <div className={classes.logoContainer}>
        {/* <img
          src={require("../../assets/images/digikalaLogo.png").default}
          alt="Digikala Logo"
        /> */}
      </div>
      <div className={`flex-signup ${classes.loginBox}`}>
        <h1 className={`py-1 ${classes.title}`}>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">{t("Login")}</Button>

          <Link className={classes.forgat_pass} to="/RegisterAdmin">
            No Account? Register Now
          </Link>
        </Form>
      </div>
      <div className={classes.keyPic}>
        <img
          src={require("../../assets/images/Admin.svg").default}
          alt="illustrator key"
        />
      </div>
    </div>
  );
}

export default AdminForm;
