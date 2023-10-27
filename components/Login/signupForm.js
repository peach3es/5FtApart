'use client';

import React, { useState } from 'react'; // Import useState hook
import "../../app/form.css";

function SignupForm() {
  const [showSignUp, setShowSignUp] = useState(true); // Initialize state for form visibility

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="Container">
      {showSignUp ? (
        // SignUp Form
        <form className="login-form py-4" id="SignUp">
          <div className="mb-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              Well share your email with Papa Johns.
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-6 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me Pookie
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      ) : (
        // Login Form
        <div className="login-form" id="logIn">
           <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="********"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="514-420-6969"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress2" className="form-label">
            Broker ID
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="32445332"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            placeholder="GainCity"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputZip" className="form-label">
            Size?
          </label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            placeholder="big."
          />
        </div>

        <div className="btn">
          <button type="submit" className="btn btn-primary">
            Turn up
          </button>
        </div>

        <div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Broker?
            </label>
          </div>
        </div>
        </div>
      )}

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="SWITCH"
          onChange={toggleForm} // Use the onChange event instead of onClick for input elements
          checked={!showSignUp} // If showSignUp is false, checkbox is checked
        />
        <label className="form-check-label" htmlFor="SWITCH">
          {showSignUp ? 'Sign Up' : 'Log In'} {/* Update label based on current form */}
        </label>
      </div>
    </div>
  );
}

export default SignupForm;