import { signInWithEmailAndPassword } from "firebase/auth"
import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/user_context";

import { auth } from "../../common/firebase";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()
    const navigate = useNavigate()
    const {loginContext} = useContext(UserContext);
    const login = (event) => {
        event.preventDefault();

        console.log(email, password, role)
        axios.get(`http://167.172.92.40:8080/api/login/email/${email}/password/${password}/role/${role}`)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        
//         axios.get(`http://localhost:8080/api/login/email/${email}/password/${password}/role/${role}`)

            .then(res => {
                console.log(res);
                const user = res.data;
                localStorage.setItem("accessToken", JSON.stringify(user));
                console.log(user);
                if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role === 'learner') {
                    localStorage.setItem("role",user.role);
                    localStorage.setItem("ID",user.studentID);
                    localStorage.setItem("name",user.name);
                    
                    
                    navigate("/");
                } else if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role === 'instructor') {
                    localStorage.setItem("role",user.role);
                    localStorage.setItem("ID",user.instructorID);
                    navigate("/user");
                } else if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role === 'admin') {
                    localStorage.setItem("role",user.role);
                    navigate("/admin");
                }
            })
            .catch(error => console.log(error));
    }

    return(
        <div>
            <form className="text-center login-form" onSubmit={login}>
                <div className="animation-title">
                    <span></span>
                </div>
                {/* <h2 className="title-login-form">Welcome back</h2> */}
                <div className="out-layout">
                <div>
                    <label>Email</label>
                    <input type="email" className="login-enter border ms-5 w-50 mt-4 px-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
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
                            <input type="radio" value="learner" id='roleL' name="rolebtn" className="ms-5"
                                onChange={(e) => setRole(e.target.value)}/>
                            <lable htmlFor='roleL'>Leaner</lable>
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