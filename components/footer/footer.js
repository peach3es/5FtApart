import React from "react";
import "styles/navbar-footer.css";

const Footer = () => {
  return (
    <footer class="d-flex justify-content-between align-items-center p-3 mt-4 border-top sticky-bottom footer">
      <p class="col-md-4 mb-0 text">© 2023 5FtApart</p>

      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text">
            Features
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text">
            Pricing
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text">
            FAQs
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text">
            About
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
