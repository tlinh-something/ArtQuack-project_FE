import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import "./UserCourse.css";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
function UserCourse() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const account = JSON.parse(localStorage.getItem(`accessToken`));
  const fetchCourse = async () => {
    const response = await api.get(
      `/api/enrollment/learner/${account.learnerID}`
    );
    setCourses(response.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="course-info">
      <h1
        style={{
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        My Course
      </h1>
      <Row gutter={12}>
        {courses.map((course) => (
          <Col key={course.courseID} span={6}>
            <div
              key={course.id}
              className="course"
              onClick={() => {
                // showModal(course.courseID);
                navigate(`/learning/${course.courseID}`);
              }}
            >
              <img
                src={
                  course.avatar
                    ? course.avatar
                    : "https://www.analyticssteps.com/backend/media/thumbnail/2435072/1339082_1630931780_Use%20of%20AI%20in%20Language%20LearningArtboard%201.jpg"
                }
                alt=""
                style={{
                  height: 200,
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div className="course-info">
                <h3>{course.courseName}</h3>
                <h5>
                  {course.cateName} - {course.levelName}
                </h5>
                <p>{course.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserCourse;
