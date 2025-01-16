import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import langContextObj from "../../store/langContext";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./SignIn.module.scss";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const langCtx = useContext(langContextObj);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/Home");
    } catch (error) {
      console.error("Error login user:", error);

      // Handle login error and display appropriate message to the user
      if (error.response && error.response.status === 402) {
        setError("Login failed. Invalid email or password.");
      } else if (error.response && error.response.status === 401) {
        setError("Account not registered. Please sign up first.");
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <div className={`${classes.container} ${langCtx.lang === "fa" ? classes.rtl : ""}`}>
      <Navbar />
      <div className={`flex-signup ${classes.loginBox}`}>
        <h1 className={`py-1 ${classes.title}`}>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {error && <p className={classes.error}>{error}</p>}
          <Button type="submit">{t("Sign In")}</Button>
          <Link className={classes.forgat_pass} to="/register">
            Register First!
          </Link>
          
        </Form>
      </div>
      <div className={classes.keyPic}>
        <img
          src={require("../../assets/images/Musik.svg").default}
          alt="illustrator key"
        />
      </div>
    </div>
  );
}

export default SignIn;
