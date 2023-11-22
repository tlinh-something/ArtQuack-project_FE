import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import api from "../../config/axios";
import "../Test.css";
import { all } from "axios";
import { Link, useNavigate } from "react-router-dom";

const CategoriesList = () => {
  const [category, setCategory] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/api/categories").then((response) => {
      setCategory(response.data.slice(0, 8));
    });
  }, []);

  const handleCardClick = (cate) => {
    // setShowDetail(true);
    navigate(`/courses/category/${cate}`)
  };

  const handleCardMouseEnter = (cateID) => {
    setHoveredCard(cateID);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="CategoriesListWrapper">
      <div className="container">
        <div className="categories-list-top mb-4">
          <h2>Categories</h2>
        </div>

        <Row gutter={40}>
          {category.map((item) => (
            <Col span={6} key={item.cateID} className="mb-5">
              <Card
                cover={
                  <img
                    src={item.picture}
                    onClick={() => handleCardClick(item.cateID)}
                    style={{
                      height: "240px",
                      transition: 'all .3s',
                      transform:
                        hoveredCard === item.cateID ? "scale(1.1)" : "scale(1)",
                    }}
                    onMouseEnter={() => handleCardMouseEnter(item.cateID)}
                    onMouseLeave={handleCardMouseLeave}
                  />
                }
              >
                <Link
                  style={{ fontSize: "20px", textAlign: "center" }}
                  to={`/courses/category/${item.cateID}`}
                >
                  {item.cateName}
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoriesList;
