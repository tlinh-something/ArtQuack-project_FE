import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from './components/footer/Footer';
import {Home, Courses, SingleCourse} from './components/pages/index';
import Register from './components/Register/Register';
// import RegisterIns from './components/Register/RegisterIns';
import Add from './components/InstructorFunction/AddCourse';
import MyCourse from './components/InstructorFunction/MyCourse';
import Update from './components/InstructorFunction/UpdateCourse';
import ViewCourse from './components/InstructorFunction/ViewCourse';
import AddItem from './components/InstructorFunction/AddItem';
import AddChapter from './components/InstructorFunction/AddChapter';
import ViewItem from './components/InstructorFunction/ViewItem';
import BlogPage from './components/Blog/BlogPage';
import UserHomePage from './components/UserPage/UserHomePage';
import LoginSignup from './components/Login signup/LoginSignup';
import Login from './components/Login signup/Login';
//import Date from './common/Date';
//import { useState } from 'react';
//import useToken from './services/useToke';


// function setToken(userToken){
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken(){
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function App() {
  //const token = getToken();
  // const { token, setToken } = useToken();
  // //const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <BrowserRouter>
   
      <Navbar />
      <Sidebar />

      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/courses/:id" element = {<SingleCourse />} />
        <Route path = "/category/:category" element = {<Courses />} />
        <Route path = "/user" element = {<UserHomePage />}/>
        <Route path="/blog" element={<BlogPage />}/>
        <Route path = "/login" element = {<LoginSignup />} />
        <Route path = "/login/v2" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        {/* <Route path = "/registerIns" element = {<RegisterIns />} /> */}
        <Route path = "mycourse" element = {<MyCourse />}>
          <Route path = "add" element = {<Add />} />
        </Route>
        <Route path = "/addchapter/:id" element = {<AddChapter />} />
        <Route path = "/update/:id" element = {<Update />} />
        <Route path = "/chapter/:id" element = {<ViewCourse />} />
        <Route path = "/item/:id" element = {<ViewItem />} />
        <Route path = "/additem/:id" element = {<AddItem />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
