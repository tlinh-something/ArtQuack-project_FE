import React from "react";
import api from "../config/axios";
import { useState,useEffect } from "react";
import StarRating from "../components/StarRating";
import './Test.css'
const SearchCourse = ({course,type}) => {

  const [review, setReview] = useState([]);
  const rates = review.map((review) => review.rate);

  // Step 2: Calculate the sum of all rate values
  const sumOfRates = rates.reduce((accumulator, rate) => accumulator + rate, 0);

  // Step 3: Calculate the average rate
  const averageRate = sumOfRates / rates.length;
  const fetchEnroll = async () => {
    await api
      .get(
        `/api/course/${course.courseID}/${
          account.learnerID ? account.learnerID : 0
        }`
      )
      .then((response) => {
        setEnroll(response.data);
        console.log(response.data);
      });
  };
  const fetchReview = () => {
    api.get(`api/enrollment/course/${course.courseID}`).then((res) => {
      setReview(res.data);
    });
  };
  useEffect(() => {
    fetchEnroll();
    fetchReview();

  }, [course.courseID]);
  return (
    <div className="search-course-container" style={{marginBottom:"30px"}}>
      <div className="item-img">
        <img
          style={{
            height: 200,
            objectFit: "cover",
            width:"100%"
          }}
          src={
            course.avatar ||
            "https://th.bing.com/th/id/R.34852e2b6e117af5cbb1af009319e292?rik=uXyTqlmPFqtFsQ&pid=ImgRaw&r=0"
          }
          alt={course.courseName}
        />
      </div>
      <div className="item-body" style={{marginLeft:"10px"}}>
        <h5 className="item-name">
          {course.name} - {course.cateName}
        </h5>
        <span className="item-creator">{course.instructorName}</span>
        <div className="item-rating flex">
          <span className="rating-star-val">Rating:</span>
          <StarRating rating_star={averageRate} />
          <span className="rating-count">( {rates.length} rated )</span>
        </div>
        <div className="item-price">
          <span className="item-price-new">${course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCourse;
