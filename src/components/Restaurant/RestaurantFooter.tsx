import React from 'react';

const RestaurantFooter: React.FC = () => {
  return (
    <footer className="restaurant-footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="footer-title">About Us</h4>
            <p className="footer-text">
              Sample Restaurant, with over 10 years of experience in serving traditional and modern Persian cuisine, always strives to ensure customer satisfaction.
            </p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="footer-title">Opening Hours</h4>
            <ul className="list-unstyled footer-text">
              <li className="mb-2">Saturday to Wednesday: 11 AM - 11 PM</li>
              <li>Thursday & Friday: 11 AM - 12 AM</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="list-unstyled footer-text">
              <li className="mb-2">Address: Valiasr Street, Tehran</li>
              <li className="mb-2">Phone: +98-21-88888888</li>
              <li>Email: info@example.com</li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-center">
            <p className="copyright">© All rights reserved 2023</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;
