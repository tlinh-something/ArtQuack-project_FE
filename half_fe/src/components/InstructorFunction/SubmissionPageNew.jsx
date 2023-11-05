import React, { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import api from "../../config/axios";
import { Link, Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label: !children ? <Link to={`${key}`}>{label}</Link> : label,
    type,
  };
}
const SubmissionPageNew = () => {
  const [items, setItems] = useState([
    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem(
        "Item 1",
        "g1",
        null,
        [getItem("Option 1", "1"), getItem("Option 2", "2")],
        "group"
      ),
      getItem(
        "Item 2",
        "g2",
        null,
        [getItem("Option 3", "3"), getItem("Option 4", "4")],
        "group"
      ),
    ]),
  ]);

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("accessToken"));
    api.get(`/api/submit/${account.instructorID}`).then((response) => {
      const courses = response.data.courses;

      setItems(
        courses.map((course) => {
          return getItem(
            course.courseName,
            `course-${course.courseID}`,
            <MailOutlined />,
            course.chapters.map((chapter) => {
              return getItem(
                chapter.chapterName,
                `chapter-${chapter.chapterID}`,
                <MailOutlined />,
                chapter.items.map((item) => {
                  return getItem(
                    item.itemName,
                    `${item.itemID}`,
                    <MailOutlined />
                  );
                })
              );
            })
          );
        })
      );
    });
  }, []);

  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className="submit-container">
      <Menu
        onClick={onClick}
        style={{
          width: 400,
          marginTop: 20,
          minHeight: "42vh",
          height: "42vh",
          maxHeight: "42vh",
          overflow: "auto",
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />

      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};
export default SubmissionPageNew;
