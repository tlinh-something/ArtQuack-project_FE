import 'bootstrap/dist/css/bootstrap.min.css'
import "./UserHomePage.css"
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from "../Navbar";
// import Sidebar from "../Sidebar";
import Footer from '../footer/Footer';
//import {Home, Courses, SingleCourse, Cart} from './index';
import UserDropdown from './UserDropdown';
import NavbarUser from './NavbarUser';
import AllCourse from './AllCourse';
function UserHomePage () {
  const a = localStorage.getItem("ID");
  console.log(a);
  return (
    <div>
      <NavbarUser/>
      <h2>Explore all courses</h2>
      <AllCourse/>
    </div>
  
      
      
   
  );
}

export default UserHomePage;
