import { useState, useContext } from "react";
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
  
    if (username === "" || email === "" || password === "") {
      alert("Data Gagal ditambahkan, field tidak boleh ada yang kosong");
    } else {
      try {
        await axios.post("http://localhost:8080/api/admin", {
          username: username,
          email: email,
          password: password,
        });
  
        // Redirect to home page or any other desired page upon successful registration
        window.location.href = "/LoginAdmin";
      } catch (error) {
        console.error("Error login admin:", error);
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
      <div className={`flex-signup ${classes.loginBox}`}>
          <h1 className={`py-1 ${classes.title}`}>Sign Up</h1>
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
              <Button type="submit">{t("Register")}</Button>

              <Link className={classes.forgat_pass} to="/LoginAdmin">
                Back to Login
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
