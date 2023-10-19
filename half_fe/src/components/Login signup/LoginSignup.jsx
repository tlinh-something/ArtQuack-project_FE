


import GoogleSignInButton from './Button signup/GoogleSignInButton'; 
import TwitterSignInButton from './Button signup/TwitterSignInButton';
import GitHubSignInButton from './Button signup/GitHubSignInButton';
import { useState } from 'react';
import axios from 'axios';
//import { Navigate } from 'react-router-dom';
import './LoginSignup.css';
import PropTypes from 'prop-types';



const LOGIN_URL = 'http://localhost:8080/api/v1/user/login';

    const handleForgotPasswordClick = () => {
    // Add your logic to handle the "Forgot Password" link click.
    // Typically, this would involve navigating the user to a password reset page.
    };

    // async function login(credentials){
    //   return axios({
    //     method: 'post',
    //     url: LOGIN_URL,
        
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(credentials)
    //   })
    //   .then(data => data.json())
    // }


    function LoginSignup() {
      const [rememberMe, setRememberMe] = useState(false);
      const [userName, setUserName] = useState('');
      const [pwd, setPwd] = useState('');

      const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
      };
      
      const handleLogin = (username, password) => {
        return axios.post (LOGIN_URL, {username, password});
      }

      const handleSubmit = async(e) => {
        e.preventDefault();
        // const token = await login({
        //   userName, pwd
        // });
        // setToken(token);
        try {
          await handleLogin(userName, pwd);
        } catch (e) {
          console.log(e);
        }
        // try {
          //  axios.post(LOGIN_URL, {
          //   username: userName,
          //   password: pwd,
          // })
          // .then(response => {
          //   if (!response.ok) {
          //     console.log('Error in getting data');
          //   }
          //   else {
          //     response.json();
          //     <Navigate to='/' replace={true} />
          // }}) 
          // .catch (function (error) {
          //   console.log(error.message);
          // })
        };
        
        return (
            <div className="main-section artistic-font">
                <div className="imgDescription col-md-7">
                    <img src="https://doagahehoc242.cloudfront.net/uploads/posts/1125/730d2d5d_-900.jpeg" alt="cat-pic"></img>
                </div>
                <div className = "Login-section col-md-6">
                    <div className="loginDescripton">
                    <h1>Welcome back </h1>
                        <p>Welcome, please fill email and password to login into your account</p>
                    </div>
                   
                    <form className="loginform" onSubmit={handleSubmit}>
                        <h5 className="form-title">Sign in with</h5>
                    <div className="social-sign-in">
              <div className="btn-google "><GoogleSignInButton /></div>
              <div className="btn-twitter"><TwitterSignInButton /></div>
              <div className="btn-github"><GitHubSignInButton /></div>
            </div>  
           
                <hr></hr>
           <p className='mb-1'>Or sign in with</p>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter your username"
                value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password"
                value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
                <span> <p className="forget-pass">
                <a  href="#" onClick={handleForgotPasswordClick}>
                  Forgot Password?
                </a>
              </p></span>
              </div>
              <button
                type="submit"
                className="login-button"
                onClick={handleSubmit}
              >
                Login
              </button>
              </form>
              </div>       
  </div>  
        );
    }
LoginSignup.PropTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginSignup;

