import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer/Footer";
import { Home, Courses, SingleCourse } from "./components/pages/index";
import Register from "./components/Register/Register";
// import RegisterIns from './components/Register/RegisterIns';
// import Add from "./components/InstructorFunction/AddCourse";
import MyCourse from "./components/InstructorFunction/MyCourse";
import Update from "./components/InstructorFunction/UpdateCourse";
// import ViewCourse from "./components/InstructorFunction/ViewCourse";
import AddItem from "./components/InstructorFunction/AddItem";
import AddChapter from "./components/InstructorFunction/AddChapter";
import ViewItem from "./components/InstructorFunction/ViewItem";
import BlogPage from "./components/Blog/BlogPage";
import LoginSignup from "./components/Login signup/LoginSignup";
import Login from "./components/Login signup/Login";
import LearningPage from "./components/studentFunction/learningPage";
import EnrollCourse from "./components/studentFunction/enrollCourse";
import BlogDetails from "./components/Blog/BlogDetails";
import AddChapterNew from "./components/InstructorFunction/AddChapterNew";
import UserHomePage from "./components/UserPage/UserHomePage";
import UserCourse from "./components/UserPage/UserCourse";

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
// }s
function App() {
  //const token = getToken();
  // const { token, setToken } = useToken();
  // //const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  // const account = JSON.parse(localStorage.getItem(`accessToken`)).role;
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     loginContext(localStorage.getItem());
  //   }
  // });
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<SingleCourse />} />
        <Route path="/category/:category" element={<Courses />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/:postID" element={<BlogDetails />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/login/v2" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path = "/registerIns" element = {<RegisterIns />} /> */}
        <Route path="/user" element={<UserHomePage />} />
        <Route path="/user/mycourse" element={<UserCourse />} />s
        <Route path="/instructor/mycourse" element={<MyCourse />}>
          {/* <Route path="add" element={<Add />} /> */}
        </Route>
        <Route path="/instructor/addchapter/:id" element={<AddChapter />} />
        <Route path="/instructor/update/:courseID" element={<Update />} />
        <Route path="/instructor/chapter/:id" element={<AddChapterNew />} />
        <Route path="/instructor/item/:id" element={<ViewItem />} />
        <Route path="/instructor/additem/:id" element={<AddItem />} />
        <Route path="/learning:id" element={<LearningPage />} />
        <Route path="/enroll" element={<EnrollCourse />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
