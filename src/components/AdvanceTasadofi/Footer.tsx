import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="tasadofi-footer">
      <div className="tasadofi-footer-column">
        <h4>Information</h4>
        <ul>
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
      <div className="tasadofi-footer-column">
        <h4>Navigation</h4>
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>Categories</li>
        </ul>
      </div>
      <div className="tasadofi-footer-column">
        <h4>Contact Us</h4>
        <ul>
          <li>Email: contact@example.com</li>
          <li>Phone: +1 234 567 890</li>
          <li>Address: Tehran, Iran</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer; 