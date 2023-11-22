//import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import "./Test.css";
import api from "../config/axios";
import { useEffect, useState } from "react";

const Course = ({ course, type }) => {
  const account = JSON.parse(localStorage.getItem(`accessToken`));
  const [enroll, setEnroll] = useState(false);
  const [review, setReview] = useState([]);

  const fetchEnroll = async () => {
    await api
      .get(
        `/api/course/${course.courseID}/${
          account?.learnerID ? account.learnerID : 0
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

  const rates = review.filter((rw) => rw.rate > 0).map((review) => review.rate);

  // Step 2: Calculate the sum of all rate values
  const sumOfRates = rates.reduce((accumulator, rate) => accumulator + rate, 0);

  // Step 3: Calculate the average rate
  const averageRate = sumOfRates / rates.length;
  let count = averageRate;
  return (
    <CourseCard>
      <div className="item-img">
        <img
          style={{
            height: 200,
            objectFit: "cover",
          }}
          src={
            course.avatar ||
            "https://th.bing.com/th/id/R.34852e2b6e117af5cbb1af009319e292?rik=uXyTqlmPFqtFsQ&pid=ImgRaw&r=0"
          }
          alt={course.courseName}
        />
      </div>
      <div className="item-body">
        <h5 className="item-name">
          {course.name} - {course.cateName}
        </h5>
        <span className="item-creator">{course.instructorName}</span>
        <div className="item-rating flex">
          <span className="rating-star-val">{count ? count.toFixed(1) : 0}</span>
          <StarRating rating_star={averageRate} />
          <span className="rating-count">({rates.length})</span>
        </div>
        <div className="item-price">
          <span className="item-price-new">${course.price}</span>
        </div>
      </div>
      <div className="item-btns flex">
        {enroll.enrolled ? (
          <Link
            to={
              // type === "mycourse" ?
              `/learning/${course.courseID}`
              // : `/courses/${course.courseID}`
            }
            className="item-btn see-details-btn"
            style={{ margin: "0 auto" }}
          >
            Learn
          </Link>
        ) : (
          <Link
            to={
              // type === "mycourse" ?
              //   `/learning/${course.courseID}`
              `/courses/${course.courseID}`
            }
            className="item-btn see-details-btn"
            style={{ margin: "0 auto" }}
          >
            See details
          </Link>
        )}

        {/* <Link
          to={
            type === "mycourse"
              ? `/learning/${course.courseID}`
              : `/courses/${course.courseID}`
          }
          className="item-btn see-details-btn"
          style={{ margin: "0 auto" }}
        >
          See details
        </Link> */}

        {account?.learnerID && enroll.enrolled ? (
          <Link
            to={`/courses/${course.courseID}`}
            className="item-btn see-details-btn"
            style={{ margin: "0 auto" }}
          >
            Review this course
          </Link>
        ) : null}
      </div>
    </CourseCard>
  );
};

const CourseCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  .item-body {
    margin: 14px 0;
    padding: 4px 18px;

    .item-name {
      font-size: 18px;
      line-height: 1.4;
      font-weight: 800;
    }
    .item-creator {
      font-size: 17px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
    .rating-star-val {
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 800;
      color: #b4690e;
      margin-right: 6px;
    }
    .rating-count {
      font-size: 12.5px;
      margin-left: 3px;
      font-weight: 500;
      opacity: 0.8;
      height: 31px;
      display: flex;
      align-items: flex-start;
    }
    .item-price-new {
      font-weight: 700;
      font-size: 15px;
    }
    .item-price-old {
      opacity: 0.8;
      font-weight: 500;
      text-decoration: line-through;
      font-size: 15px;
      margin-left: 8px;
    }
  }

  .item-btns {
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    margin-top: auto;
    .item-btn {
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn {
        background-color: transparent;
        border: 1px solid var(--clr-black);
        margin-right: 5px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
        }
      }

      &.add-to-cart-btn {
        background: rgba(0, 0, 0, 0.9);
        color: var(--clr-white);
        border: 1px solid rgba(0, 0, 0, 0.9);

        &:hover {
          background-color: transparent;
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
`;

export default Course;
