//import React from 'react';
import styled from "styled-components";
// import Tabs from "../components/Tab";
// import { useCoursesContext } from "./context/course_context";
import api from "../config/axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Course from "./Course";
const CourseList = () => {
  // const { courses } = useCoursesContext();
  const [count, setCount] = useState("");
  const [course, setCourse] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const fetchCount = () => {
    api.get("/api/courses").then((res) => {
      setCount(res.data.length);
      setCourse(res.data.slice(0, 6));
      console.log(res.data);
    });
  };
  useEffect(() => {
    fetchCount();
  }, []);
  return (
    <CoursesListWrapper>
      <div className="container">
        <div className="courses-list-top" style={{ textAlign: "center" }}>
          <h1>A broad selection of courses</h1>
          <p>
            We have {count} online video courses with new additions published
            every month
          </p>
        </div>

        {/* <div className="displayAllCourse">
      <div className="courses-grid">
        {course.map((cours) => (
          <Course course={cours} key={cours.courseID} />
        ))}
      </div></div> */}
        <h2>Top courses</h2>
        <Row gutter={50}>
  {course.map(item => {
    const handleCardClick = () => {
      setShowDetail(true);
    };

    const handleCardMouseEnter = () => {
      setHoveredCard(item.courseID);
    };

    const handleCardMouseLeave = () => {
      setHoveredCard(null);
    };

    const isCardHovered = item.courseID === hoveredCard;

    return (
      <Col span={8} key={item.courseID} className="mb-5">
        <Card
          cover={<img src={item.avatar} style={{ height: '300px' }} />}
          onClick={handleCardClick}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          style={{ transform: isCardHovered ? 'scale(1.1)' : 'scale(1)' }}
        >
          <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: isCardHovered ? 'bold' : 'normal' }}>
            {item.name}
          </div>
        </Card>
      </Col>
    );
  })}
</Row>

        {showDetail && (
          <div style={{textAlign:"center",fontStyle:"italic"} }>
            <h1>Want to see in detail? Sign up and get started.</h1>
            {/* Place your sign-up component or link here */}
          </div>
        )}

        {/* <Tabs courses={courses} /> */}
      </div>
    </CoursesListWrapper>
  );
};

const CoursesListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p {
    font-size: 1.8rem;
  }
`;

export default CourseList;
