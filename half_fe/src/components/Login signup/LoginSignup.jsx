
import './LoginSignup.css'
import UserHomePage from "../UserPage/UserHomePage"
import GoogleSignInButton from './Button signup/GoogleSignInButton'; 
import TwitterSignInButton from './Button signup/TwitterSignInButton';
import GitHubSignInButton from './Button signup/GitHubSignInButton';
import { useEffect, useState } from 'react';
import { useUser } from '../context/user_context';
import { useNavigate } from 'react-router-dom';
    function LoginSignup() {
      const navigateTo = useNavigate();
      // const { setUser } = useUser();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [loggedIn, setLoggedIn] = useState(false);
        const [rememberMe, setRememberMe] = useState(false);
        const handleLogin = () => {
        //  //APIs
        //   // If login is successful, set loggedIn to true
        //   if (username === 'user' && password === 'password') {
        //     useEffect(()=>{
        //       setUser(user);
        //     },[]);
            
        //   } else {
        //     // Handle login failure (e.g., show an error message)
        //   }
        // };
      
        // // Redirect to the homepage if loggedIn is true
        // if (loggedIn) {
        //   navigateTo('/');
        }
            const handleForgotPasswordClick = () => {
            // Add your logic to handle the "Forgot Password" link click.
            // Typically, this would involve navigating the user to a password reset page.
          };
        const handleRememberMeChange = () => {
          setRememberMe(!rememberMe);
        };
      
        const handleSubmit = async(e) => {
          e.preventDefault();
          // Add your form submission logic here
        };
        return (
            <div className="main-section artistic-font">
                <div className="imgDescription col-md-7">
                    <img src="https://doagahehoc242.cloudfront.net/uploads/posts/1125/730d2d5d_-900.jpeg" alt="cat-pic"></img>
                </div>
                <div className = "Login-section col-md-5">
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
           <p>Or sign in with</p>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                className="form-control" 
                id="username" 
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                className="form-control"
                id="password" 
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)} />
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
                onClick={handleLogin}
              >
                Login
              </button>
              </form>
              </div>       
  </div>  
        );
    }


export default LoginSignup;

