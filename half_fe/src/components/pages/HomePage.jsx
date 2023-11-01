//import React from 'react';
import Hero from "../Hero";
import Navbar from "../navbar/Navbar";
import CoursesList from "../CourseList";
import CategoriesList from "../category/CategoriesList";
const HomePage = () => {
  return (
    <div className="holder">
      <Hero />
      <CoursesList />
      <CategoriesList />
    </div>
  );
};

export default HomePage;
