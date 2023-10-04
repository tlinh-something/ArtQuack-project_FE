import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from './components/footer/Footer';
import {Home, Courses, SingleCourse, Cart} from './components/pages/index';
import Login from './components/Login signup/LoginSignup';
import Register from './components/Register/Register';
import RegisterIns from './components/Register/RegisterIns';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/courses/:id" element = {<SingleCourse />} />
        <Route path = "/category/:category" element = {<Courses />} />
        <Route path = "/cart" element = {<Cart />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/registerIns" element = {<RegisterIns />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
