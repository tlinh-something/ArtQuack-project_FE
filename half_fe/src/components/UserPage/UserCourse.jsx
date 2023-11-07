import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import "./UserCourse.css";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Course from "../Course";

function UserCourse() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const account = JSON.parse(localStorage.getItem(`accessToken`));
  
  const fetchCourse = async () => {
    const response = await api.get(
      `/api/enrollment/learner/${account.learnerID}`
    );
    setCourses(response.data);
    setCourses(response.data.filter(course => course.status))
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="course-info">
      <h1
        style={{
          textAlign: "center",
          marginTop: 30,
          marginBottom: 25,
        }}
      >
        My Course
      </h1>
      {/* <Row gutter={12}>
        {courses.map((course) => (
          <Col span={4} key={course.courseID}>
            <Course course={course} key={course.courseID} />
          </Col>
        ))}
      </Row> */}
      <div className="courses-grid">
        {courses.map((course) => (
          <Course course={course} key={course.courseID} type="mycourse" />
        ))}
      </div>
    </div>
  );
}

export default UserCourse;
