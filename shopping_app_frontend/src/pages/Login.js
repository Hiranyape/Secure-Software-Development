import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSignup, onLogin, onViewProfile, onGoogleSignIn } from "../store/actions"; 
import { AddressComponent } from "../components/Address-comp";
import { useLocation, useHistory } from "react-router-dom"; 
import { Profile } from "./Profile";
import "./style/Login.css"; 



const Login = () => {
  const { user, profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { id, token } = user;
  const history = useHistory(); 

  const { address, wishlist, orders } = profile; // Fixed 'wishlist' typo

  const [isSignup, setSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(onViewProfile());
    }
  }, [token, dispatch]);

  const userSignup = () => {
    dispatch(onSignup({ email, password, telephone }));
  };
  const userLogin = () => {
    dispatch(onLogin({ email, password }));
    history.push("/profile");
  };

  // Google Sign-In handler
  const handleGoogleSignIn = () => {
    dispatch(onGoogleSignIn()); 
  };

  const loginForm = () => {
    return (
      <div className="container">
      <div className="login-page-container">
       <div className="image-container">
        <img
          src="https://www.greenqueen.com.hk/wp-content/uploads/2021/07/Rental-Fashion-Causes-More-Emissions-Than-Throwing-Clothes-Away.jpg"
          alt="Login visual"
          className="side-image"
        />
      </div>
      <div className="login-container">
        <form className="login-form">
        <h2 className="text-left">Login</h2>
        <p className="text-left">Welcome back! Please login to your account.</p>
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
            <button
              className="btn btn-primary mr-2 login-btn"
              onClick={() => userLogin()}
              type="button"
            >
              Login
            </button>
          </div>
            <p className="text-left">
              Doesn't have an account yet?{" "}
              <a href="/signup" className="signup-link">
                Sign Up
              </a>
            </p>
              <div className="line-container">
                <hr className="line" />
                <span className="text">or login with</span>
                <hr className="line" />
              </div>
             
          <div className="form-group">
            <button
              className="btn btn-danger google-btn"
              onClick={() => handleGoogleSignIn()}
              type="button"
            >
              {/* Just the "G" logo and text */}
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google G logo"
                style={{ width: '30px', marginRight: '10px' }} // Adjust image size and margin
              />
              Login with Google
            </button>
        </div>

        </form>
      </div>
      </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div
        className="signup-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30rem",
        }}
      >
        <form className="signup-form">
          <div className="from-group">
            <label>Email address</label>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="from-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="from-group">
            <label>Telephone</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter telephone"
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
          <div className="row m-2 float-right">
            <button
              className="btn btn-primary mr-2 signup-btn"
              onClick={() => userSignup()}
              type="button"
            >
              Signup
            </button>
            <button
              className="btn btn-primary login-btn"
              onClick={() => setSignup(false)}
              type="button"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
      
    );
  };

  return loginForm();
};

export { Login };
