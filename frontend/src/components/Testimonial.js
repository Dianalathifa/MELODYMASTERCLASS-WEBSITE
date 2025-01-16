import React from "react";
import Navbar from "./navbar/Navbar";
import ProfilePic from "../assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import Footer from "./Footer";

const Testimonial = ({ name, text, stars, imageSrc }) => {
  return (
    <div>
      <Navbar />
    <div className="testimonial">
      <img src={imageSrc} alt={name} />
      <p>{text}</p>
      <div className="testimonials-stars-container">
        {Array(stars)
          .fill(0)
          .map((_, index) => (
            <AiFillStar key={index} />
          ))}
      </div>
      <h2>{name}</h2>
      </div>
    </div>
  );
};

const TestimonialContainer = () => {
  return (
    <div>
    <div className="course-section-wrapper">
      <div className="course-section-top">
        <p className="coach-primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        
      </div>
      <div className="testimonials-container">
        <Testimonial
          name="John Doe"
          text="Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam."
          stars={5}
          imageSrc={ProfilePic}
        />
        <Testimonial
          name="Jane Doe"
          text="Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam."
          stars={4}
          imageSrc={ProfilePic}
        />
        <Testimonial
          name="Mary Smith"
          text="Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam."
          stars={3}
          imageSrc={ProfilePic}
        />
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default TestimonialContainer;
