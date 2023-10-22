import React from "react";
import "../../styles/login.css";

const Forms = () => {
  return (
    <div className="login-form">
      <form>
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
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

        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={switchUP()}/>
            <label class="form-check-label" for="flexSwitchCheckDefault">Sign Up</label>
        </div>
      </form>
    </div>
  );
};

export default Forms;
