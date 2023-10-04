// import React from 'react';
// import styled from "styled-components";
import {Link} from "react-router-dom";
import './Category.css';
const Category = ({image, category}) => {
  return (
    <Link to = {`/category/${category}`}>
      <div className='CategoryItemWrapper flex flex-column bg-alice-blue'>
        <div className='category-item-img'>
          <img src = {image} alt = {category} />
        </div>
        <div className='category-item-name'>
          <h6>{category}</h6>
        </div>
      </div>
    </Link>
  )
}



export default Category