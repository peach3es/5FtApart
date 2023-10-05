import React from "react";
import "styles/navbar-footer.css";

const Footer = () => {
  return (
    <footer className="d-flex justify-content-between align-items-center p-3 mt-4 border-top sticky-bottom footer">
      <p className="col-md-4 mb-0 text">© 2023 5FtApart</p>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text">
            About
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
