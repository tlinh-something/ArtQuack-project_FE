import { useEffect, useRef, useState } from "react";
import { MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import api from "../../config/axios";
import { Link, Outlet, useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const LearningPageNew = () => {
  const { id } = useParams();
  // const [chapters, setChapters] = useState([])
  const [defaultSelected, setDefault] = useState(0);
  // const [openKey, setOpenKey] = useState([]);
  // const list = useRef([]);

  // useEffect(() => {
  //   console.log(openKey);
  // }, [openKey]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label: !children ? <Link to={`${key}`}>{label}</Link> : label,
      type,
      // onTitleClick: (e) => {
      //   let newList = [];
      //   console.log(list.current.includes(e.key));
      //   console.log(e.key);
      //   console.log(list.current);
      //   if (list.current?.includes(e.key)) {
      //     newList = list.current.filter((item) => item !== e.key);
      //   } else {
      //     newList = [...list.current];
      //     newList.push(e.key);
      //   }

      //   list.current = newList;

      //   setOpenKey(newList);
      //},
    };
  }

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
        chapters.map((chapter, index) => {
          // if (index === 0) {
          //   setOpenKey([`chapter-${chapter.chapterID}`]);
          //   list.current = [`chapter-${chapter.chapterID}`];
          // }
          return getItem(
            chapter.chapterName,
            `chapter-${chapter.chapterID}`,
            <PlusOutlined />,
            chapter.items
              .filter((i) => i.status)
              .map((item) => {
                // if (defaultSelected === 0 && index === 0)
                //   setDefault(item.itemID);
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
    console.log(e);
  };
  return (
    <div className="submit-container">
      <Menu
        onTitleClick={() => {
          console.log("ok");
        }}
        onClick={onClick}
        style={{
          width: 350,
          marginTop: 20,
          minHeight: "70vh",
          height: "42vh",
          maxHeight: "42vh",
          // overflow: "auto",
        }}
        // selectedKey={defaultSelected}
        // openKeys={openKey}
        defaultSelectedKeys={'1'}
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
