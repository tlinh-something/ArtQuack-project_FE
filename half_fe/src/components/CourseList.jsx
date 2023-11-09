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
  const [count, setCount] = useState('');
  const [course, setCourse] = useState([]);

  const fetchCount = () =>{
    api.get('/api/courses').then(res=>{
      setCount(res.data.length);
      setCourse(res.data.slice(0,6))
      console.log(res.data);
    })
  }
  useEffect(()=>{
    fetchCount();
  }, [])
  return (
    <CoursesListWrapper>
      <div className="container">
        <div className="courses-list-top">
          <h1>A broad selection of courses</h1>
          <p>
            We have {count} online video courses with new additions
            published every month
          </p>
        </div>

        {/* <div className="displayAllCourse">
      <div className="courses-grid">
        {course.map((cours) => (
          <Course course={cours} key={cours.courseID} />
        ))}
      </div></div> */}

        <Row gutter={16}>
          {course.map(item => {
            return  <Col span={8} key={item.courseID}  className="mb-5">
            <Card cover={<img src={item.avatar} style={{height: '300px'}}/>}>{item.name}</Card>
            </Col>
          })}
        </Row>

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
