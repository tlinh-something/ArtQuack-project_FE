import React, { useState } from "react";
import { useParams } from "react-router";
import "../Test.css";
import { Col, List, Row } from "antd";
import { Icon } from "@iconify/react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import api from "../../config/axios";
import { CheckBox } from "@mui/icons-material";
import SearchCourse from "../SearchCourse";
const SearchPage = () => {
  const { id } = useParams();
  const [resultCount, setResultCount] = useState(0);
  const [levels, setLevels] = useState([]);
  const [courses, setCourses] = useState([]);
  const fetchCourse = async () => {
    const response = await api.get(`/api/courses/${id}`);
    setCourses(response.data.filter((c) => c.courseStatus === 'ACTIVE'));
  };
  const fetchLevels = async () => {
    try {
      await api.get("/api/levels").then((res) => {
        const lvl = setLevels(res.data);
        console.log(lvl);
      });
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };
  useEffect(() => {
    fetchLevels();
    fetchCourse();
  }, [id]);
  console.log(levels);
  const handleClick = () => {};
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Level", "sub1", <Icon icon="carbon:skill-level-advanced" />, [
      getItem("Beginner", "Beginner"),
      getItem("Intermediate", "Intermediate"),
      getItem("Advanced", "Advanced"),
      getItem("Expert", "Expert"),
    ]),
    getItem("Category", "sub2", <Icon icon="carbon:skill-level-advanced" />, [
      getItem("Portrait Drawing", "Portrait Drawing"),
      getItem("Landscape Drawing", "Landscape Drawing"),
      getItem("Still Life Drawing", "Still Life Drawing"),
      getItem("Figure Drawing", "Figure Drawing"),
      getItem("Cartoon Drawing", "Cartoon Drawing"),
      getItem("Anime Drawing", "Anime Drawing"),
      getItem("Abstract Drawing", "Abstract Drawing"),
      getItem("Realistic Drawing", "Realistic Drawing"),
      getItem("Watercolor Painting", "Watercolor Painting"),
      getItem("Oil Painting", "Oil Drawing"),
    ]),
  ];
  const onClick = (e) => {
    console.log("click ", e.key);
  };
  return (
    <div
      className="search-container"
      style={{ width: "80%", margin: "0 auto" }}
    >
      <h2 style={{margin:"30px"}}>
      We have {courses.length} results with "{id}"
      </h2>
      <List pagination={{
        position: 'bottom', 
        pageSize: 3
      }} 
      dataSource={courses}
      renderItem={(item, index) => {
        return <SearchCourse course={item} key={item.courseID} />
      }}/>
    </div>
  );
};

export default SearchPage;
