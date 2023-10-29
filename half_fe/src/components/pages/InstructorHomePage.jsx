//import React from 'react';
import Hero from "../Hero";
import NavbarIns from "../navbar/NarbarIns";
import CoursesList from "../CourseList";
import CategoriesList from '../category/CategoriesList';
const InstructorHomePage = () => {
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