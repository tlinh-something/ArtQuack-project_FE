import React from "react";
import api from "../config/axios";
import { useState,useEffect } from "react";
import StarRating from "../components/StarRating";
import { useNavigate } from "react-router-dom";
import './Test.css'
const SearchCourse = ({course,type}) => {
  const navigate = useNavigate();
  const [review, setReview] = useState([]);
  const rates = review.map((review) => review.rate);
  const account = JSON.parse(localStorage.getItem('accessToken'))
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
  const handleClick=()=>{
    navigate(`/courses/${course.courseID}`)
  }
  return (
    <div className="search-course-container" style={{marginBottom:"30px"}} onClick={handleClick}>
      <div className="item-img">
        <img
          style={{
            height: 200,
            
            width:300
          }}
          src={
            course.avatar ||
            "https://th.bing.com/th/id/R.34852e2b6e117af5cbb1af009319e292?rik=uXyTqlmPFqtFsQ&pid=ImgRaw&r=0"
          }
          alt={course.courseName}
        />
      </div>
      <div className="item-body" style={{marginLeft:"10px"}}>
        <h5 className="item-name fs-3" >
          {course.name} - {course.cateName}
        </h5>
        <div className="item-description" style={{fontStyle:"italic"}}>{course.description}</div>
        <span className="item-creator">{course.instructorName}</span>
        <div className="item-rating flex">
          <span className="rating-star-val">Rating:</span>
          <div style={{marginTop:"18px",marginLeft:"5px",marginRight:"5px"}}>

          <StarRating rating_star={averageRate} />
          </div>
          <span className="rating-count">( {rates.length} rated )</span>
        </div>
        <div className="item-price fs-5">
          <span className="item-price-new">${course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCourse;
