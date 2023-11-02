//import React from 'react';
import styled from "styled-components";
import Tabs from "../components/Tab";
import { useCoursesContext } from "./context/course_context";

const CourseList = () => {
  const { courses } = useCoursesContext();

  return (
    <CoursesListWrapper>
      <div className="container">
        <div className="courses-list-top">
          <h1>A broad selection of courses</h1>
          <p>
            We have about 204,000 online video courses with new additions
            published every month
          </p>
        </div>

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
