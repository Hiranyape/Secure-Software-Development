import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGoogleCallback, onViewProfile,handleGoogleCallbackSignUp } from "../store/actions";
import { useLocation, useHistory } from "react-router-dom"; 

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory(); 
  const { user } = useSelector((state) => state.userReducer);
  const { token } = user;
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    console.log(code);
    const intent = localStorage.getItem("googleAuthIntent");
    if (code && !token) { 
      if (intent === "signIn") {
        dispatch(handleGoogleCallback(code))
          .then(() => {
            dispatch(onViewProfile());
            localStorage.removeItem("googleAuthIntent");
            history.push("/profile");
          })
          .catch((err) => {
            console.error("Google Sign-In failed:", err);
          });
      } else if (intent === "signUp") {
        dispatch(handleGoogleCallbackSignUp(code))
          .then(() => {
            dispatch(onViewProfile());
            localStorage.removeItem("googleAuthIntent");
            history.push("/profile");
          })
          .catch((err) => {
            console.error("Google Sign-Up failed:", err);
          });
      } else {
        console.error("No valid intent found");
      }
    } else {
      console.error("No authorization code found or token already exists");
    }
  }, [dispatch, location, history]);

  const spinnerStyle = {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 1s linear infinite",
    marginBottom: "20px"
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Arial', sans-serif",
  };

  const headingStyle = {
    color: "#333",
    fontWeight: "normal"
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <h2 style={headingStyle}>Logging in with Google...</h2>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export { GoogleCallback };
