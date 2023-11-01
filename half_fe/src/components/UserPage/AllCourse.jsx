import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import "./UserCourse.css";
function AllCourse() {
  const userID = JSON.parse(localStorage.getItem("accessToken")).learnerID;
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [data, setData] = useState("");
  const [courseDetail, setCourseDetail] = useState();
  const [enrollDetail, setEnrollDetail] = useState();
  const showModal = (id) => {
    setIsModalOpen(id);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleEnroll=async()=>{
      const response = await api.post(`/api/learner/${userID}/course/${isModalOpen}/enrollment`);
      if(response) 
      setEnrollDetail(response.data)
  }
  const handleCancel = () => {
    setIsModalOpen(null);
  };
  const [courses, setCourses] = useState([]);
  const fetchCourse = async () => {
    const response = await api.get("/api/courses");
    setCourses(response.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  
  const fetchCourseDetail = async () => {
    const response = await api.get(`/api/course/${isModalOpen}`);
    setCourseDetail(response.data);
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchCourseDetail();
      handleEnroll();
    }
  }, [isModalOpen]);

  return (
    <div className="displayAllCourse">
      <div className="courses-grid">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course"
            onClick={() => {
              showModal(course.courseID);
            }}
          >
            <h3>{course.cateName}</h3>
            <h4>
              <button>{course.name}</button>
            </h4>
            {/* <h4>
              <Link to="/user/enrollment">{course.name}</Link>
            </h4> */}
            <p>{course.description}</p>
          </div>
        ))}
      </div>
      <div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        
        >
          {courseDetail?.name}
          <br></br>
          <button onClick={handleEnroll}>
            Enroll
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default AllCourse;
