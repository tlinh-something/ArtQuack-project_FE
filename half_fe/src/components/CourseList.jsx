import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import styled from "styled-components";
import "./Test.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchCourses = () => {
    api.get("/api/courses").then((res) => {
      setCourses(res.data);
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCardClick = (courseID) => {
    navigate(`/guest/courses/${courseID}`);
  };

  const handleCardMouseEnter = (courseID) => {
    setHoveredCard(courseID);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const cardsPerPage = 4;
  const renderCourses = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const visibleCourses = courses.slice(startIndex, endIndex);
    console.log(startIndex);
    console.log(endIndex);
    console.log(visibleCourses);

    return visibleCourses.map((item) => (
      <Col
        xs={24}
        sm={12}
        md={6}
        span={6}
        key={item.courseID}
        style={{ height: "410px" }}
      >
        <Card
          cover={<img src={item.avatar} style={{ height: "300px" }} />}
          onClick={() => handleCardClick(item.courseID)}
          onMouseEnter={() => handleCardMouseEnter(item.courseID)}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transition: "all .3s",
            transform:
              hoveredCard === item.courseID ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              textAlign: "center",
              fontWeight: hoveredCard === item.courseID ? "bold" : "normal",
              height: 70,
            }}
          >
            {item.name}
          </div>
        </Card>
      </Col>
    ));
  };

  let count = cardsPerPage

  const totalPages = Math.ceil(courses.length / count);

  return (
    <CoursesListWrapper>
      <div className="container">
        <div className="courses-list-top" style={{ textAlign: "center" }}>
          <h1>A broad selection of courses</h1>
          <p>We have {courses.length} online video courses available</p>
        </div>

        <div className="top-course-title">
          <h2>All Courses</h2>
        </div>

        <Row gutter={[24,24]}>{renderCourses()}</Row>

        <div className="carousel-buttons pt-4">
          <Button
            type="primary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{ paddingBottom: "30px", marginRight: "20px" }}
          >
            <LeftOutlined />
          </Button>
          <Button
            type="primary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{ paddingBottom: "30px", marginLeft: "20px" }}
          >
            <RightOutlined />
          </Button>
        </div>
      </div>
    </CoursesListWrapper>
  );
};

const CoursesListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p {
    font-size: 1.8rem;
  }
  .carousel-buttons {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
  .carousel-buttons button {
    margin: 0 8px;
  }
`;

export default CourseList;
