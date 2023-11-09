// import React from 'react';
// import styled from "styled-components";
import { categories_images } from "../utils/images";
import Category from "./Category";
import { useCoursesContext } from "../context/course_context";
import "./Category.css";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";

const CategoriesList = () => {
  const [category, setCategory] = useState([]);

  // const fetchCategory = () => {
  //   api.get(`/api/categories`)
  //   .then(response => setCategory(response.data))
  //}

  useEffect(() => {
    api.get(`/api/categories`).then((response) => setCategory(response.data.slice(0, 6)));
  }, []);

  // const { categories } = useCoursesContext();
  return (
    <div className="CategoriesListWrapper">
      <div className="container">
        <div className="categories-list-top">
          <h2>Top Categories</h2>
        </div>
        {/* <div className="categories-list grid"> */}
        
        <Row gutter={16}>
          {category.map(item => {
            return  <Col span={8} key={item.cateID} className="mb-5">
            <Card cover={<img src={item.picture} style={{height: '280px'}}/>}>{item.cateName}</Card>
            </Col>
          })}
        </Row>
          {/* {
            category.map((cateName) => {
              // const categoryImage = categories_images[cateName]
              return (
                <Category category = {cateName} key = {cateName} />
              )
            })
          } */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CategoriesList;
