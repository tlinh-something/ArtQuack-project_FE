// import React from 'react';
// import styled from "styled-components";
import { categories_images } from '../utils/images';
import Category from './Category';
import { useCoursesContext } from '../context/course_context';
import './Category.css'
const CategoriesList = () => {
  const {categories} = useCoursesContext();
  return (
    <div className='CategoriesListWrapper'>
      <div className='container'>
        <div className='categories-list-top'>
          <h2>Top Categoriess</h2>
        </div>
        <div className='categories-list grid'>
          {
            categories.map((cateName, idx) => {
              return (
                <Category image = {categories_images[idx]} category = {cateName} key = {idx} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}



export default CategoriesList