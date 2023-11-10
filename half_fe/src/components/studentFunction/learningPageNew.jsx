import { useEffect, useState } from "react";
import { MailOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import api from "../../config/axios";
import { Link, Outlet, useParams } from "react-router-dom";
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
const LearningPageNew = () => {
  const { id } = useParams();
  // const [chapters, setChapters] = useState([])
  const [items, setItems] = useState([
    getItem("Navigation Three", "sub4", <MailOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]);

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("accessToken"));
    api.get(`/api/all-of-course/${id}`).then((response) => {
      const chapters = response.data;
      console.log(chapters);

      setItems(
        chapters.map((chapter) => {
          return getItem(
            chapter.chapterName,
            `chapter-${chapter.chapterID}`,
            <PlusOutlined />,
            chapter.items.map((item) => {
              return getItem(item.itemName, `${item.itemID}`, null);
            })
          );
        })
      );
      //   setItems(
      //     courses
      //       .filter((item) => item.status)
      //       .map((course) => {
      //         return getItem(
      //           course.courseName,
      //           `course-${course.courseID}`,
      //           <PlusOutlined />,
      //           course.chapters.map((chapter) => {
      //             return getItem(
      //               chapter.chapterName,
      //               `chapter-${chapter.chapterID}`,
      //               <MinusOutlined />
      //             );
      //           })
      //         );
      //       })
      //   );
      //});
    });
  }, [id]);

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
export default LearningPageNew;
