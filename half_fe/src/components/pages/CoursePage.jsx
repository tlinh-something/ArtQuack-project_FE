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
  const fetchCourse = async () => {
    await api.get(`/api/category/${id}/courses`).then((res) => {
      setCourse(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <CoursesPageWrapper>
      <div className="container">
        <div className="category-based-list">
          {course &&
            course.map((course) => (
              <Course key={course.courseID} course={course} />
            ))}
        </div>
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
