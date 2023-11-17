import { useEffect, useState } from "react";
import { MailOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import api from "../../config/axios";
import { Link, Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

function getItems(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label: !children ? <Link to={`${key}`}>{label}</Link> : label,
    type,
  };
}

const ViewSubmission = () => {
  const [items, setItems] = useState([
    getItems("Navigation One", "sub1", <MailOutlined />, [
      getItems(
        "Item 1",
        "g1",
        null,
        [getItems("Option 1", "1"), getItems("Option 2", "2")],
        "group"
      ),
      getItems(
        "Item 2",
        "g2",
        null,
        [getItems("Option 3", "3"), getItems("Option 4", "4")],
        "group"
      ),
    ]),
  ]);

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("accessToken"));
    console.log(account.learnerID);
    api.get(`/api/submit-of-learner/${account.learnerID}`).then((response) => {
      const courses = response.data.courses.filter((item) => item.status);
      console.log(courses);

      setItems(
        courses
          .filter((item) => item.status)
          .map((course) => {
            return getItems(
              course.courseName,
              `course-${course.courseID}`,
              <PlusOutlined />,
              course.chapters
                .filter((item) => item.status)
                .map((chapter) => {
                  return getItems(
                    chapter.chapterName,
                    `chapter-${chapter.chapterID}`,
                    <MinusOutlined />,
                    chapter.items
                      .filter((item) => item.status)
                      .map((item) => {
                        return getItems(
                          item.itemName,
                          `/user/submission/${item.itemID}`
                          // <MailOutlined />
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
          width: 350,
          marginTop: 20,
          minHeight: "70vh",
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
export default ViewSubmission;
