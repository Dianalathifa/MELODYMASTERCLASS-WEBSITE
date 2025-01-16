import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import AboutBackgroundImage from "./about-background-image.png";
import Footer from "../Footer";
import axios from 'axios';
import "./About.css";

const redirectToCoursePage = () => {
  window.location.href = '/course';
};

const SubscriptionCard = ({ duration, benefits }) => {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditCard");
  const [email, setEmail] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscribeModal(true);
  };

  const handleCloseSubscribeModal = () => {
    setShowSubscribeModal(false);
    setTransactionStatus(null);
    setLoading(false);
  };

  const handleSubscribeFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const price = calculatePrice(duration);
      const paymentMethod = selectedPaymentMethod;

      const response = await axios.post(`http://localhost:8080/api/transaksi`, {
        email,
        price,
        payment_method: paymentMethod,
        duration,
      });

      if (response.status === 200) {
        setTransactionStatus('Transaksi Berhasil Diproses!');
      } else {
        setTransactionStatus('Transaksi Gagal Diproses!');
      }
    } catch (error) {
      console.error('Error:', error);
      setTransactionStatus('Transaksi Gagal Diproses!');
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = (duration) => {
    switch (duration) {
      case "7 Days":
        return 9.99;
      case "1 Month":
        return 29.99;
      case "12 Months":
        return 99.99;
      default:
        return 0;
    }
  };

  return (
    <div className="subscription-card">
      <h3>{duration} Subscription</h3>
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
      <button
        className="btn btn-purple text-white"
        style={{ backgroundColor: '#AA72C3', borderColor: '#AA72C3' }}
        onClick={handleSubscribeClick}
      >
        Subscribe
      </button>

      <Modal show={showSubscribeModal} onHide={handleCloseSubscribeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactionStatus && (
            <div className={`transaction-status ${transactionStatus.includes('Berhasil') ? 'success' : 'failure'}`}>
              {transactionStatus}
            </div>
          )}
          <Form onSubmit={handleSubscribeFormSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={`$${calculatePrice(duration)}`}
              />
            </Form.Group>
            <Form.Group controlId="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              {["creditCard", "payPal", "other"].map((method) => (
                <Form.Check
                  key={method}
                  type="radio"
                  label={method === "other" ? "Other" : method}
                  name="paymentMethod"
                  value={method}
                  checked={selectedPaymentMethod === method}
                  onChange={() => setSelectedPaymentMethod(method)}
                />
              ))}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Subscribe'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const About = () => {
  const subscriptions = [
    {
      duration: "7 Days",
      benefits: ["Premium Account", "High-quality content"],
    },
    {
      duration: "1 Month",
      benefits: ["Premium Account", "High-quality content"],
    },
    {
      duration: "12 Months",
      benefits: ["Premium Account", "High-quality content"],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="about-section-container">
        <div className="subscription-cards-container">
          {subscriptions.map((subscription, index) => (
            <SubscriptionCard key={index} {...subscription} />
          ))}
        </div>

        <div className="about-background-image-container"></div>
        <div className="about-section-image-container">
          <img src={AboutBackgroundImage} alt="" />
        </div>
        <div className="about-section-text-container">
          <h1 className="primary-heading">What Will Learn?</h1>
          <p className="primary-text">o Introduction to Musical Instrument</p>
          <p className="primary-text">o Method of Use</p>
          <p className="primary-text">o Music playing technique</p>
          <p className="primary-text">o Chord Music</p>
          <div className="about-buttons-container">
            <button className="secondary-button" onClick={redirectToCoursePage}>
              Learn More
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
