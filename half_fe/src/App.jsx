import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from './components/footer/Footer';
import {Home, Courses, SingleCourse} from './components/pages/index';
import Login from './components/Login signup/LoginSignup';
import Register from './components/Register/Register';
import RegisterIns from './components/Register/RegisterIns';
import Add from './components/InstructorFunction/AddCourse';
import MyCourse from './components/InstructorFunction/MyCourse';
import Update from './components/InstructorFunction/UpdateCourse';
import AddTopic from './components/InstructorFunction/AddTopic';
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
        {/* <Route path = "/user" element = {<UserHomePage/>}/>
        <Route path="/BlogPage" element={<BlogPage/>}/> */}
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/registerIns" element = {<RegisterIns />} />
        <Route path = "mycourse" element = {<MyCourse />}>
          <Route path = "add" element = {<Add />} />
        </Route>
        <Route path = "/addtopic/:id" element = {<AddTopic />} />
        <Route path = "/update/:id" element = {<Update />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
