import React from "react";
import "styles/navbar-footer.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav class="navbar navbar-dark navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          5FtApart
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" href="/search">
                Search
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/buy">
                Buy
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/sell">
                Sell
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/mybroker">
                My Broker
              </Link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown"
                role="button"
                aria-expanded="false"
                data-bs-offset="10,20"
              >
                Tools
              </a>
              <ul class="dropdown-menu">
                <li>
                  <Link class="dropdown-item" href="/calculator">
                    Calculator
                  </Link>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another section
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Click for Kanye nudes
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/signup">
                <FontAwesomeIcon icon={faUser} /> Sign Up
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">
                <FontAwesomeIcon icon={faRightToBracket} /> Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;