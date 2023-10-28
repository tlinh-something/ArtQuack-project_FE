
// import Form from 'react-bootstrap/Form';
// // import './App.css';
// // import CollapsibleExample from '../navbars';
// //import Footering from '../footer/Footer';
// import './Register.css';
// // import { Fragment } from 'react';

// function Register() { 
  
//   return(
//     <>
//     {/* <div>
//       <CollapsibleExample />
//     </div> */}

//     <div id='app' className='container-register'>
//       <h1>Sign Up</h1>
//       <h4>To learn draw with quack quack</h4>
//       <div>
//         <form>
//           <Form.Group className='mb-3' id='data'>
//             {/* <Form.Label><i className='fa-solid fa-user'></i></Form.Label> */}
//             <Form.Label>Username</Form.Label>
//             <Form.Control className='enter' type='text' placeholder='Your Name' required />
//           </Form.Group>

//           <Form.Group className='mb-3'id='data'>
//             {/* <Form.Label><i className='fa-solid fa-envelope'></i></Form.Label> */}
//             <Form.Label>Email</Form.Label>
//             <Form.Control className='enter'type='email' placeholder='Your Email' required />
//           </Form.Group>

//           <Form.Group className='mb-3' id='data'>
//             {/* <Form.Label><i className='fa-solid fa-lock'></i></Form.Label> */}
//             <Form.Label>Password</Form.Label>
//             <Form.Control className='enter' type='password' placeholder='Password' required />
//           </Form.Group>

//           <Form.Group className='mb-3' id='data'>
//             {/* <Form.Label><i className='fa-solid fa-lock'></i></Form.Label> */}
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control className='enter' type='password' placeholder='Confirm password' required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Check className='check' required
//               label="Agree to Terms and Privacy Policy"
//             />
//           </Form.Group>

//           <button type='submit' className='btn'>Register</button>
//         </form>
//       </div>
//       <div className='link'>
//         <p>
//           Already have account? <a href='/login'>LogIn</a>
//         </p>
//       </div>
//     </div>

//     {/* <div> 
//       <Footering />
//     </div> */}
//     </>
//   )
// }


// export default Register;



import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import './Register.css';
import HomePage from "../pages/HomePage";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const EMAIL_REGEX = /^[\w-]+@[\w-]+\.[a-z]{2,3}/;
const PWD_REGEX = /^(?=(.*[0-9]))(?=(.*[A-Z]))(?=(.*[a-z])).{8,24}$/;

function Register () {
    const userRef = useRef();
    const errRef = useRef();

    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [role, setRole] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd, role])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/register/role/${role}`, {
            name: fullname,
            email: email,
            password: pwd,
            role: role,
            status: true
        })
        .then((response) => {
            const user = response.data;
            localStorage.setItem("accessToken", JSON.stringify(user))
            if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role === 'student') {
                navigate('/login/v2')
            } else if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role === 'instructor') {
                navigate('/login')
            }
            console.log(fullname, email, pwd, role)
            alert('Registration Successfully')
        })
        .catch(error => console.log(error))
        setSuccess(true);
    }
  
    return (
        <>
            {success ? (
                <section>
                    <HomePage />
                </section>
            ) : (
                <div id='app' className='container'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {/* <h1 className="title-signup-form">Register</h1> */}
                    <div className="animation-title-regis">
                        <span></span>
                    </div>
                    <form onSubmit={handleSubmit} className="register-form">
                        <div id="data" className="mt-3 mb-3 w-100">
                            <label htmlFor="Your Fullname" className="lable-form ms-3">
                                Fullname:
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullname}
                                required
                                // onFocus={() => setUserNameFocus(true)}
                                // onBlur={() => setUserNameFocus(false)}
                                style={{border:'1px solid #000', marginLeft: 'auto', marginRight: '5px', paddingLeft: '5px',height: '25px', width: '60%'}}
                            />
                            <FontAwesomeIcon icon={faCheck} className={fullname ? "valid" : "hide"} />
                        </div>

                        <div id="data" className="mt-3 mb-3 w-100">
                            <label htmlFor="email" className="lable-form ms-3">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="usernote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(true)}
                                style={{border:'1px solid #000', marginLeft: 'auto', paddingLeft: '5px', height: '25px', width: '60%'}}
                            />
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />

                            <p id="usernote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Email must include @.<br />
                                Letters, numbers, special characters allowed.
                            </p>
                        </div>

                        <div id="data" className="mt-3 mb-3 w-100">
                            <label htmlFor="password" className="lable-form ms-3">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                style={{border:'1px solid #000', marginLeft: 'auto', paddingLeft: '5px', height: '25px', width: '60%'}}
                            />
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />

                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number.<br />
                            </p>
                        </div>

                        <div id="data" className="mt-3 mb-3 w-100">
                            <label htmlFor="confirm_pwd" className="lable-form ms-3">
                                Confirm:
                            </label>
                            <input 
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                style={{border:'1px solid #000', marginLeft: 'auto', paddingLeft: '5px', height: '25px', width: '60%'}}
                            />
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Password do not match.
                            </p>
                        </div>

                        <ul className="flex">
                            <li>Role:</li>
                            <li className="chooserole">
                                <input type="radio" value="leaner" id='roleL' name="rolebtn" className="ms-5"
                                    onChange={(e) => setRole(e.target.value)}/>
                                <lable htmlFor='roleL'>Leaner</lable>
                            </li>
                            <li className="chooserole">
                                <input type="radio" value="instructor" id='roleI' name="rolebtn" className="ms-5"
                                    onChange={(e) => setRole(e.target.value)}/>
                                <lable htmlFor='roleI'>Instructor</lable>
                            </li>
                        </ul>
                    
                        <button type='submit' onClick={handleSubmit} className='btn-signup mb-3' disabled={!validEmail || !validPwd || !validMatch || !role ? true : false}>Register</button>
                    </form>

                    <Form.Group className="mb-3">
                        <Form.Check className='check' required
                        label="Agree to Terms and Privacy Policy"
                        />
                        {/* <input type="checkbox" required><label>Agree to Terms and Privacy Policy</label></input> */}
                        
                    </Form.Group>

                    <div className='link'>
                        <p>
                        Already have account? <a href='/login/v2' className="link-signup">LogIn</a>
                        </p>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default Register