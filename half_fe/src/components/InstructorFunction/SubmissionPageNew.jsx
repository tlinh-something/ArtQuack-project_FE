import { useEffect, useRef, useState } from "react";
import { MailOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import api from "../../config/axios";
import { Link, Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const SubmissionPageNew = () => {
  const [courses, setCourse] = useState([]);
  const [defaultSelected, setDefault] = useState(0);
  const [openKey, setOpenKey] = useState([]);
  const list = useRef([]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label: !children ? <Link to={`${key}`}>{label}</Link> : label,
      type,
      onTitleClick: (e) => {
        let newList = [];
        console.log(list.current.includes(e.key));
        console.log(e.key);
        console.log(list.current);
        if (list.current?.includes(e.key)) {
          newList = list.current.filter((item) => item !== e.key);
        } else {
          newList = [...list.current];
          newList.push(e.key);
        }

        list.current = newList;

        setOpenKey(newList);
      },
    };
  }

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
      const courseList = response.data.courses;
      setCourse(response.data.courses);
      console.log(courseList);

      setItems(
        courseList
          .filter((course) => course.status)
          .map((course, index) => {
            if (index === 0) {
              setOpenKey([`course-${course.courseID}`]);
              list.current = [`course-${course.courseID}`];
            }
            return getItem(
              course.courseName,
              `course-${course.courseID}`,
              <PlusOutlined />,
              course.chapters
                .filter((chapter) => chapter.status)
                .map((chapter) => {
                  return getItem(
                    chapter.chapterName,
                    `chapter-${chapter.chapterID}`,
                    <MinusOutlined />,
                    chapter.items
                      .filter((item) => item.status)
                      .map((item) => {
                        console.log(chapter.items[0]);
                        return getItem(
                          item.itemName,
                          `/instructor/submission/${item.itemID}`
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
    setDefault(e.key);
  };
  return (
    <div className="submit-container">
      <Menu
        onClick={onClick}
        style={{
          width: 400,
          marginTop: 20,
          minHeight: "70vh",
          height: "42vh",
          maxHeight: "42vh",
          overflow: "auto",
        }}
        selectedKeys={defaultSelected}
        openKeys={openKey}
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
