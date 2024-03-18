import React from "react";
// import "./Footer.css"; // Import CSS file for styling
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h2>Contact Us</h2>
          <p>Indore Institute Of Science And Technology</p>
          <p>Indore, India</p>
          <p>Email: info@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="footer-column">
          <h2>Feedback</h2>
          <p>We value your feedback!</p>
          <p>Send us your thoughts and suggestions.</p>
          <button className="feedback-button">Submit Feedback</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Institute Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
