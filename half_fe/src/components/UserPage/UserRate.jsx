import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../StarRating";
import { MdInfo } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
//import {FaShoppingCart} from "react-icons/fa";
import { CheckOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { Table } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { FaShoppingCart } from "react-icons/fa";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../Test.css";
  const RateCoursePage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState([]);
    const [chapter, setChapter] = useState([]);
    const [description, setDescription] = useState('Tell us here!')
    const [rateEdit,setRateEdit] = useState({
      rate:"",
      description:"",
    })
    const price = useRef();
    const account = JSON.parse(localStorage.getItem("accessToken"));
    useEffect(() => {
      api.get(`/api/course/${id}/${account.learnerID}`).then((response) => {
        setCourse(response.data);
        price.current = response.data.price;
      });
    }, [id]);

    const fetchChapter = () => {
      api.get(`/api/course/${id}/chapters`).then((response) => {
        setChapter(response.data);
        console.log(response.data);
      });
    };

    useEffect(() => {
      fetchChapter();
    }, []);

    const scriptOptions = {
      clientId:
        "AS_kGKyi8kMb-m3z7SZocpoPihQLS9MGjq7QaYTG3N9b64CRE6mgcFs7HzH16qwPTblmix3ivoSPf0ly",
    };

    const [rating, setRating] = useState(0);
    const handleStarClick = (selectedRating) => {
      setRating(selectedRating);
      setRateEdit({ ...rateEdit, rate: selectedRating });
      console.log("Selected rating:", selectedRating);
    };
   

    const starStyle = {
      color: "#e6e6e6",
      fontSize: "35px",
      cursor: "pointer",
      transition: "color 0.2s ease",
    };

    const activeStarStyle = {
      color: "#ff9c1a",
    };

    const handleDescriptionChange=()=>{

    }
    const handleSubmit=async(e)=>{
      
        if(await api.put(`/api/learner/${account.learnerID}/course/${id}/enrollment`,rateEdit)) 
        window.alert("oke");
        
    }
    const handleEdit=(e)=>{
      setRateEdit({...rateEdit,[e.target.description]:e.target.value});
    }
    return (
      <div>
        <RateCourseWrapper>
          <div className="course-intro mx-auto grid">
            <div className="course-img">
              <img
                src={
                  course.avatar ||
                  "https://th.bing.com/th/id/R.34852e2b6e117af5cbb1af009319e292?rik=uXyTqlmPFqtFsQ&pid=ImgRaw&r=0"
                }
                alt={course.name}
              />
            </div>
            <div className="course-details">
              <div className="course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block">
                {course.cateName}
              </div>
              <div className="course-head">
                <h5>{course.name}</h5>
              </div>
              <div className="course-body">
                <p className="course-para fs-18">{course.description}</p>
                <div className="course-rating flex">
                  <span className="rating-star-val fw-8 fs-16">{4}</span>
                  <StarRating rating_star={4} />
                  <span className="rating-count fw-5 fs-14">({4})</span>
                  <span className="students-count fs-14">{10}</span>
                </div>

                <ul className="course-info">
                  <li>
                    <span className="fs-14">
                      Created by{" "}
                      <span className="fw-6 opacity-08">
                        {course.instructorName}
                      </span>
                    </span>
                  </li>
                  <li className="flex">
                    <span>
                      <MdInfo />
                    </span>
                    <span className="fs-14 course-info-txt fw-5">
                      Last updated 20/11/2023
                    </span>
                  </li>
                  <li className="flex">
                    <span>
                      <TbWorld />
                    </span>
                    <span className="fs-14 course-info-txt fw-5">English</span>
                  </li>
                </ul>
              </div>

              <div className="course-foot">
                <div className="course-price">
                  <span className="new-price fs-26 fw-8">${course.price}</span>
                </div>
              </div>

              <div className="course-btn">
                {!course.enrolled ? (
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
                        // handleEnroll();
                        const response = await api.post(
                          `/api/learner/${account.learnerID}/course/${id}/enrollment`,
                          {
                            enrollmentID: 0,
                            rate: 0,
                            comment: "string",
                            date: new Date().toISOString(),
                            status: true,
                          }
                        );
                        swal(
                          "Good Job",
                          "Successfully enroll to course",
                          "success"
                        );
                      }}
                    />
                  </PayPalScriptProvider>
                ) : (
                  <Link
                    to={`/learning/${id}`}
                    className="add-to-cart-btn d-inline-block fw-7 bg-orange"
                    style={{
                      backgroundColor: "var(--clr-orange)",
                    }}
                  >
                    <FaShoppingCart /> Learn
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div></div>
        </RateCourseWrapper>
        <div className="rating-box">
          <header>How was your experience of this course?</header>
          <div className="stars">
            <FontAwesomeIcon
              icon={faStar}
              style={rating >= 1 ? activeStarStyle : starStyle}
              onClick={() => handleStarClick(1)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={rating >= 2 ? activeStarStyle : starStyle}
              onClick={() => handleStarClick(2)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={rating >= 3 ? activeStarStyle : starStyle}
              onClick={() => handleStarClick(3)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={rating >= 4 ? activeStarStyle : starStyle}
              onClick={() => handleStarClick(4)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={rating >= 5 ? activeStarStyle : starStyle}
              onClick={() => handleStarClick(5)}
            
            />
          </div>
          <div>
              <header>Write your description</header>
              <input
              type="text"
              id="description"
              name="desription"
              value={rateEdit.description}
              onChange={(e) => handleEdit(e)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    );
  };

const RateCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .course-intro {
    padding: 40px 16px;
    max-width: 992px;

    .course-details {
      padding-top: 20px;
    }

    .course-category {
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head {
      font-size: 50px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para {
      padding: 12px 0;
    }
    .rating-star-val {
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count {
      margin-left: 8px;
    }
    .rating-count {
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info {
      li {
        &:nth-child(2) {
          margin-top: 10px;
        }
      }
      .course-info-txt {
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price {
      .old-price {
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn {
      margin-top: 16px;
      .add-to-cart-btn {
        padding: 12px 28px;
        span {
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details {
        padding-top: 0;
      }
      .course-img {
        order: 2;
        font-size: 20px;
      }
    }

    @media screen and (min-width: 1400px) {
      grid-template-columns: 60% 40%;
    }
  }

  .course-full {
    padding: 40px 16px;
    .course-sc-title {
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn {
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list {
        li {
          margin: 5px 0;
          display: flex;
          span {
            &:nth-child(1) {
              opacity: 0.95;
              display: flex;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content {
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list {
        li {
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }
`;

export default RateCoursePage;
