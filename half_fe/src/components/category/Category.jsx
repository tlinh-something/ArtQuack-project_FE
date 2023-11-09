// import React from 'react';
// import styled from "styled-components";
import {Link} from "react-router-dom";
import './Category.css';
const Category = ({ category}) => {
  return (
    <Link to = {`/category/${category.cateID}`}>
      <div className='CategoryItemWrapper flex flex-column bg-alice-blue'>
        <div className='category-item-img'>
        <img src={"https://140301922.cdn6.editmysite.com/uploads/1/4/0/3/140301922/s509053548122148726_p8_i1_w501.png?width=800&optimize=medium"} alt={category.cateName} />
        </div>
        <div className='category-item-name'>
          <h6>{category.cateName}</h6>
        </div>
      </div>
    </Link>
  )
}



export default Category