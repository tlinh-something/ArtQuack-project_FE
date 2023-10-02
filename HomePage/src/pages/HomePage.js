import React from 'react';
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";
import CategoriesList from "../components/Category/CategoriesList";
import TeacherRegister from '../components/TeacherRegister/TeacherRegister';

const HomePage = () => {
  return (
    <div className='holder'>
      <Hero />
      <CoursesList />
      <CategoriesList />
      <TeacherRegister/>
    </div>
  )
}

export default HomePage