import React from "react";
import "./navbar-footer.css";

const Footer = () => {
  return (
    <footer class="d-flex justify-content-between align-items-center p-3 mt-4 border-top sticky-bottom footer">
      <p class="col-md-4 mb-0 text-body-secondary">© 2023 HomeHub</p>

      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-body-secondary">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-body-secondary">
            Features
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-body-secondary">
            Pricing
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-body-secondary">
            FAQs
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-body-secondary">
            About
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
