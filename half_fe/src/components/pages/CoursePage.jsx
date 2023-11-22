//import React from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Course from "../Course";
// import { useCoursesContext } from "../context/course_context";
import { useEffect, useState } from "react";
import api from "../../config/axios";

const CoursesPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [cateTitle, setCateTitle] = useState();

  const fetchCourse = async () => {
    await api.get(`/api/category/${id}/courses`).then((res) => {
      setCourse(res.data);
    });
  };

  const fetchCategory = async () => {
    await api.get(`/api/category/${id}`).then((response) => {
      setCateTitle(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchCourse();
    fetchCategory();
  }, []);

  return (
    <CoursesPageWrapper>
      <div className="container">
        <h1
          className="mt-5"
          style={{ fontFamily: "Times", fontSize: "38px", fontWeight: "600" }}
        >
          {cateTitle?.cateName} Courses
        </h1>
        <h2 className="mt-4 mb-5" style={{ fontFamily: "monospace" }}>
          Courses to get you started
        </h2>
        {course && course.length > 0 ? (
          <div className="category-based-list">
            {course &&
              course.map((course) => (
                <Course key={course.courseID} course={course} />
              ))}
          </div>
        ) : (
          <h4
            style={{
              fontFamily: "sans-serif",
              color: "#ff6e01",
              display: "flex",
              justifyContent: "center",
              textTransform: "none",
            }}
          >
            [ There are no courses in this category yet ]
          </h4>
        )}
      </div>
    </CoursesPageWrapper>
  );
};

const CoursesPageWrapper = styled.div`
  .category-based-list {
    margin-top: 32px;
  }
  @media screen and (min-width: 600px) {
    .category-based-list {
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 992px) {
    .category-based-list {
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1400px) {
    .category-based-list {
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default CoursesPage;
