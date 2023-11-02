import React, { useEffect, useRef, useState } from "react";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import "./UserCourse.css";
import swal from "sweetalert";
import formatCurrencyUSD from "../../common/convertToCurrency";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
function AllCourse() {
  const userID = JSON.parse(localStorage.getItem("accessToken")).learnerID;
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [data, setData] = useState("");
  const [courseDetail, setCourseDetail] = useState();
  const [enrollDetail, setEnrollDetail] = useState();
  const price = useRef();
  const scriptOptions = {
    clientId:
      "AS_kGKyi8kMb-m3z7SZocpoPihQLS9MGjq7QaYTG3N9b64CRE6mgcFs7HzH16qwPTblmix3ivoSPf0ly",
  };
  const showModal = (id) => {
    setIsModalOpen(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleEnroll = async () => {
    const response = await api.post(
      `/api/learner/${userID}/course/${isModalOpen}/enrollment`
    );
    swal("Good Job", "Successfully enroll to course", "success");
    setIsModalOpen(null);
  };
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
    price.current = response.data.price;
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchCourseDetail();
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
            <img
              src={
                course.avatar
                  ? course.avatar
                  : "https://www.analyticssteps.com/backend/media/thumbnail/2435072/1339082_1630931780_Use%20of%20AI%20in%20Language%20LearningArtboard%201.jpg"
              }
              alt=""
            />
            <div className="course-info">
              <h3>{course.name}</h3>
              <h5>
                {course.cateName} - {course.levelName}
              </h5>
              <p>{course.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Modal
          title={`${courseDetail?.name} - ${courseDetail?.levelName}`}
          open={isModalOpen}
          onOk={handleEnroll}
          onCancel={handleCancel}
          okText="Enroll"
        >
          <img
            src={
              courseDetail?.avatar
                ? courseDetail?.avatar
                : "https://www.analyticssteps.com/backend/media/thumbnail/2435072/1339082_1630931780_Use%20of%20AI%20in%20Language%20LearningArtboard%201.jpg"
            }
          />
          <div className="course-detail-info">
            Instuctor: <strong>{courseDetail?.instructorName}</strong>
          </div>
          <div className="course-detail-info">
            Price: <strong>{formatCurrencyUSD(courseDetail?.price)}</strong>
          </div>
          <p>{courseDetail?.description}</p>
          <PayPalScriptProvider options={scriptOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                console.log("Creating order:", data);

                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: price.current, // Set the payment amount here
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                handleEnroll();
              }}
            />
          </PayPalScriptProvider>
        </Modal>
      </div>
    </div>
  );
}

export default AllCourse;
