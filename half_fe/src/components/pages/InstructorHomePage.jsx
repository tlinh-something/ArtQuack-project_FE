//import React from 'react';
import Hero from "../Hero";
import NavbarIns from "../navbar/NarbarIns";
import CoursesList from "../CourseList";
import CategoriesList from '../category/CategoriesList';
import { useEffect, useState } from "react";
const InstructorHomePage = () => {
  const [role,setRole] = useState();
  useEffect(()=>{
   const save = setRole(JSON.parse(localStorage.getItem("role")));
console.log(save);
  })
  return (
    <div className='holder'>
      <NavbarIns/>
      <Hero />
      <CoursesList />
      <CategoriesList />
    </div>
  )
}

export default InstructorHomePage