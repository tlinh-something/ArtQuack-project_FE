//import { Form } from "react-bootstrap"
//import axios from "axios";
import { useState } from "react"
//import { Link } from "react-router-dom";

function Login() {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()

    function login(event) {
        event.preventDefault();
        console.log(username, password, role)
        // axios.get(`http://localhost:8080/api/login/username/${username}/password/${password}/role/${role}`)
        //     .then(res => {
        //         const user = res.data;
        //         localStorage.setItem("accessToken", JSON.stringify(user));
        //         if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role == 'student') {
        //             history.push("/student");
        //         } else if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role == 'instructor') {
        //             history.push("/instructor");
        //         } else if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role == 'admin') {
        //             history.push("/admin");
        //         }
        //     })
        //     .catch(error => console.log(error));
    }

    return(
        <div>
            <form className="text-center login-form">
                <div className="animation-title">
                    <span></span>
                </div>
                {/* <h2 className="title-login-form">Welcome back</h2> */}
                <div className="out-layout">
                <div>
                    <label>Username</label>
                    <input type="text" className="login-enter border ms-5 w-50 mt-4 px-2"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" className="login-enter border ms-5 w-50 mt-5 px-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <ul className=" role-select flex mt-3">
                        <li>Role</li>
                        <li className="chooserole">
                            <input type="radio" value="student" id='roleS' name="rolebtn" className="ms-5"
                                onChange={(e) => setRole(e.target.value)}/>
                            <lable htmlFor='roleS'>Student</lable>
                        </li>
                        <li className="chooserole">
                            <input type="radio" value="instructor" id='roleI' name="rolebtn" className="ms-5"
                                onChange={(e) => setRole(e.target.value)}/>
                            <lable htmlFor='roleI'>Instructor</lable>
                        </li>
                    </ul>
                </div>
                <button type="submit" onClick={login} className="loginbtn">Login</button>
                <p className="mt-5">Do not have account? <a href='/register' className="link-signup">SignUp</a></p>
                </div>
            </form>
            {/* <Link to="/" className="link-signup">Back to Home</Link> */}
        </div>
    )
}
export default Login