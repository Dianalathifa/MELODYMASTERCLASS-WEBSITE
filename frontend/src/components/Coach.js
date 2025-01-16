import React from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";


const Coach = () => {
  
  const coachInfoData = [
    {
      image: image1,
      title: "David",
      text:
        "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
      rating: 4.8,
      price: "$69.99",
    },
    {
        image: image2,
        title: "Marco",
        text:
          "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        rating: 4.8,
        price: "$69.99",
      },
      {
        image: image3,
        title: "Sam",
        text:
          "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        rating: 4.8,
        price: "$69.99",
      },
      {
        image: image4,
        title: "Yola",
        text:
          "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        rating: 4.8,
        price: "$69.99",
      },
  ];

  // Fungsi untuk menghasilkan bintang berdasarkan nilai rating
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i}>&#9733;</span>); // Simbol Unicode bintang berisi (☆ atau &#9733;)
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Simbol Unicode bintang kosong (★ atau &#9734;)
      }
    }
    return stars;
  };

  return (
    <div className="new-coach-section-wrapper">
      <div className="new-coach-section-top">
        <p className="coach-primary-subheading">COACH</p>
        <h1 className="new-primary-heading">Choose Your Coach</h1>
      </div>
      <div className="new-coach-section-bottom">
        {coachInfoData.map((data) => (
          <div className="new-coach-section-info" key={data.title}>
            <div className="new-info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2 className="new-coach-title">{data.title}</h2>
            <p className="new-coach-text">{data.text}</p>
            <div className="new-coach-rating">
              <span>Rating: {data.rating}</span>
              <div className="rating-stars">{renderRatingStars(data.rating)}</div>
            </div>
            <div className="new-coach-price">
              <span>Price: {data.price}</span>
            </div>
            <button className="new-add-to-cart-button">
              <span>Add to Cart</span>
              <i className="fas fa-shopping-cart"></i> 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coach;
