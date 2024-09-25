import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSignup, onViewProfile, onGoogleSignIn,onGoogleSignUp } from "../store/actions"; // Import Google sign-in action
import { Profile } from "./Profile";
import { useLocation, useHistory } from "react-router-dom"; 
import "./style/SignUp.css"; 

const Signup = () => {
  const { user, profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { token } = user;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const history = useHistory(); 

  useEffect(() => {
    if (token) {
      dispatch(onViewProfile());
    }
  }, [token, dispatch]);

  const userSignup = () => {
    dispatch(onSignup({ email, password, telephone }));
    history.push("/profile");
  };

  const handleGoogleSignIn = () => {
    dispatch(onGoogleSignUp()); 
  };

  // This is the form, now correctly returned
  const signUpForm = () => {
    return (
      <div className="container">
        <div className="login-page-container">
          <div className="image-container">
            <img
              src="https://www.greenqueen.com.hk/wp-content/uploads/2021/07/Rental-Fashion-Causes-More-Emissions-Than-Throwing-Clothes-Away.jpg"
              alt="Sign up visual"
              className="side-image"
            />
          </div>
          <div className="login-container">
            <form className="login-form">
              <h2 className="text-left">Sign Up</h2>
              <p className="text-left">Welcome! Please sign up to get started.</p>
              <div className="form-group">
                <label>Email address</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Telephone</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter telephone"
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary mr-2 login-btn"
                  onClick={() => userSignup()}
                  type="button"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-left">
                Already have an account?{" "}
                <a href="/login" className="signup-link">
                  Login
                </a>
              </p>
              <div className="line-container">
                <hr className="line" />
                <span className="text">or sign up with</span>
                <hr className="line" />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-danger google-btn"
                  onClick={() => handleGoogleSignIn()}
                  type="button"
                >
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google G logo"
                    style={{ width: "30px", marginRight: "10px" }}
                  />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return signUpForm(); // Return the sign-up form
};

export { Signup };
