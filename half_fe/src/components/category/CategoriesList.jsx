import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import api from '../../config/axios';
import '../Test.css';

const CategoriesList = () => {
  const [category, setCategory] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    api.get('/api/categories').then(response => {
      setCategory(response.data.slice(0, 8));
    });
  }, []);

  const handleCardClick = () => {
    setShowDetail(true);
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

        <Row gutter={35}>
          {category.map(item => (
            <Col span={6} key={item.cateID} className="mb-5">
              <Card
                cover={
                  <img
                    src={item.picture}
                    onClick={handleCardClick}
                    style={{ height: '240px', transform: hoveredCard === item.cateID ? 'scale(1.1)' : 'scale(1)' }}
                    className=""
                    onMouseEnter={() => handleCardMouseEnter(item.cateID)}
                    onMouseLeave={handleCardMouseLeave}
                  />
                }
              >
                <div style={{ fontSize: '20px', textAlign: 'center' }}>{item.cateName}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoriesList;