// import React, { useReducer, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { onSignup, onLogin, onViewProfile  } from '../store/actions'
// import { AddressComponent } from "../components/Address-comp";
// import { Profile } from "./Profile";

// //load Shopping profile
// const Login = () => {

//     const { user, profile } = useSelector(state => state.userReducer);
//     const dispatch = useDispatch();

//     const { id, token } = user;

//     const { address, whishlist, orders } = profile;

//     const [isSignup, setSignup] = useState(false);

//     const [ email, setEmail ] = useState('');
//     const [ password, setPassword ] = useState('');

//     useEffect(() => {
//         if(token){
//             dispatch(onViewProfile())
//         }
//     },[token])

//     const userSignup = () => {
//         //call Signup
//     }

//     const userLogin = () => {
//         dispatch(onLogin({email, password}));
//     }

//     const loginForm = () => {
//         return (<div className="row bg-secondary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,height: '30rem'}}>
//                 <div className="col col-sm-5 col-md-4 col-lg-3 col-xl-2">
//                     <form>
//                         <div className="from-group" controlId="formBasicEmail">
//                             <label>Email address</label>
//                             <input className="form-control" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
//                         </div>
//                         <div className="from-group" controlId="formBasicPassword">
//                             <label>Password</label>
//                             <input className="form-control" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//                         </div>
//                         <div className="row m-2 float-right">
//                             <button  className="btn btn-primary mr-2 " onClick={() => userLogin()} type="button">
//                                 Login
//                             </button>
//                             <button className="btn btn-primary" type="button">
//                                 Signup
//                             </button>

//                         </div>
//                     </form>
//                 </div>
//         </div> );

//     }

//     const signUpForm = () => {
//         return <div className="row">
//             <h1> Signup </h1>
//         </div>
//     }

//     if(token){
//         return <Profile />
//     }else{

//         return <div className="container-fluid">
//             {isSignup ? signUpForm() : loginForm()}
//         </div>

//     }

// }

// export { Login };

import React, { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSignup, onLogin, onViewProfile } from "../store/actions";
import { AddressComponent } from "../components/Address-comp";
import { Profile } from "./Profile";
import "./style/Login.css"; // Import CSS file for styling
import "./style/SignUp.css"; // Import CSS file for styling

// Load Shopping profile
const Login = () => {
  const { user, profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { id, token } = user;

  const { address, whishlist, orders } = profile;

  const [isSignup, setSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(onViewProfile());
    }
  }, [token]);

  const userSignup = () => {
    dispatch(onSignup({ email, password, telephone }));
  };
  const userLogin = () => {
    dispatch(onLogin({ email, password }));
  };

  const loginForm = () => {
    return (
      <div className="login-container">
        <form className="login-form">
          <div className="form-group">
            <label>Email address</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter email"
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
            <button
              className="btn btn-primary signup-btn"
              onClick={() => setSignup(true)}
              type="button"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div
        className="signup-container" // Updated class name
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30rem",
        }}
      >
        <form className="signup-form">
          {" "}
          <div className="from-group" controlId="formBasicEmail">
            <label>Email address</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="from-group" controlId="formBasicPassword">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="from-group" controlId="formBasicTelephone">
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
              className="btn btn-primary mr-2 mr-2 signup-btn" // Updated class name"
              onClick={() => userSignup()}
              type="button"
            >
              Signup
            </button>

            <button
              className="btn btn-primary login-btn" // Updated class name
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

  if (token) {
    return <Profile />;
  } else {
    return (
      <div className="container-fluid">
        {isSignup ? signUpForm() : loginForm()}
      </div>
    );
  }
};

export { Login };
