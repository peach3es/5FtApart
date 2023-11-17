import React from "react";
import "styles/navbar-footer.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          5FtApart
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/search">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/buy">
                Buy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/sell">
                Sell
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/mybroker">
                My Broker
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown"
                role="button"
                aria-expanded="false"
                data-bs-offset="10,20"
              >
                Tools
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/calculator">
                    Calculator
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another section
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another one
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                <FontAwesomeIcon icon={faUser} /> Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
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
