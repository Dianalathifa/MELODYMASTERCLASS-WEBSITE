import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import langContextObj from "../../store/langContext";
import { useTranslation } from "react-i18next";
// import { CCard } from "@coreui/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Register.module.scss";

function RegisterCoachForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langCtx = useContext(langContextObj);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      alert("Data Gagal ditambahkan, field tidak boleh ada yang kosong");
    } else {
      try {
        await axios.post("http://localhost:8080/api/coach", {
          username: username,
          email: email,
          password: password,
        });

        // Redirect to home page or any other desired page upon successful registration
        window.location.href = "/SignIn";
      } catch (error) {
        console.error("Error registering coach:", error);
        // Handle registration error (e.g., display an error message)
      }
    }
  };

  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <Navbar />
      <div className={`flex-signup ${classes.loginBox}`}>
          <h1 className={`py-1 ${classes.title}`}>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
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
              <Button type="submit">{t("RegisterCoach")}</Button>

              <Link className={classes.forgat_pass} to="/SignIn">
                Back to Login
              </Link>
               <Link className={classes.forgat_pass} to="/register">
                 | Sign Up as User
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

export default RegisterCoachForm;
