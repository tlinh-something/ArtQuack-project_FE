import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import './UserCourse.css';
function UserCourse() {
  const [courses, setCourses] = useState([]);
  const account = JSON.parse(localStorage.getItem(`accessToken`));
  const fetchCourse = async () => {
    const response = await api
      .get(`/api/enrollment/learner/${account.learnerID}`);
     setCourses(response.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <div key={course.id} className="course">
          <h3>{course.courseName}</h3>
          <h4>{course.date}</h4>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default UserCourse;
