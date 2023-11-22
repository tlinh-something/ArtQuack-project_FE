import { useEffect, useState } from "react"
import api from "../../config/axios"
import { Layout, Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import SubMenu from "antd/es/menu/SubMenu"

const SubmissionPage = () => {
    const [courses, setCourses] = useState([])
    const [chapters, setChapters] = useState([])
    const [item, setItem] = useState([])

    const fetchCourse = async() => {
        const account = JSON.parse(localStorage.getItem(`accessToken`));
        const response = api.get(`/api/instructor/${account.instructorID}/coursesOfInstructor`)
        .then((response) => {
            setCourses(
                response.data.map((item, index) => {
                    return {
                        ...item,
                        key: index,
                    };
                 })
            );
        });
        setCourses(response.data)
    }

    const fetchChapter = async(courseID) => {
        // const response = await api.get(`/api/course/11/chapters`)
        const response = await api.get(`/api/course/${courseID}/chapters`)
        setChapters(response.data)
    }

    const fetchItem = async (chapterID) => {
        const response = await api.get(`/api/chapter/${chapterID}/items`);
        setItem(response.data);
        // setSelectedItemId(response.data[0]?.id);
        // setSelectedChapterId(response.data[0]?.chapterID);
        console.log(response.data);
      };

    useEffect(() => {
        fetchCourse();
        fetchChapter();
        // fetchItem();
    },[])

    function getData(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      
      const data = courses.map((course) => ({
        key: course.courseID,
        label: course.name,
        type: "group",
        children: chapters
          .filter((chapter) => chapter.courseID === course.courseID)
          .map((chapter) => ({
            key: chapter.chapterID,
            label: chapter.chapterName,
            type: "group",
            children: item
              .filter((itm) => itm.chapterID === chapter.chapterID)
              .map((itm) => ({
                key: itm.itemID,
                label: itm.itemName,
                type: "item",
              })),
          })),
      }));
      
      const MenuSider = () => (
        <Menu
          style={{
            width: 256,
          }}
          defaultSelectedKeys={item.length > 0 ? [item[0].itemID.toString()] : []}
          defaultOpenKeys={courses.length > 0 ? [courses[0].courseID.toString()] : []}
          mode="inline"
          items={data}
        />
      );

    return(
        <Layout style={{ minHeight: "100vh" }}>
            <Sider theme="dark">
                <MenuSider />
            </Sider>
        </Layout>

      //   <Layout style={{ minHeight: "100vh" }}>
      // <Sider theme="dark" width={256}>
      //   <Menu mode="inline" style={{ height: "100%" }}>
      //     {courses.map((course) => (
      //       <SubMenu key={course.courseID} title={course.name}>
      //         {chapters.map((chapter) => (
      //           <SubMenu key={chapter.chapterID} title={chapter.chapterName}>
      //             {items.map((item) => (
      //               <Menu.Item key={item.itemID}>{item.itemName}</Menu.Item>
      //             ))}
      //           </SubMenu>
      //         ))}
      //       </SubMenu>
      //     ))}
      //   </Menu>
      // </Sider>
    // </Layout>
    )
}

export default SubmissionPage



//import React, { useState, useEffect } from 'react';
// import { Layout, Menu, Typography } from "antd";
// import api from "../../config/axios";
// import { useEffect, useState } from "react";
// import Sider from "antd/es/layout/Sider";
// import { Content } from "antd/es/layout/layout";

// const InlineMenu = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState(null);
//   const [chapters, setChapters] = useState([]);
//   const [selectedChapterId, setSelectedChapterId] = useState(null);
//   const [items, setItems] = useState([]);

//   const fetchCourse = () => {
//     const account = JSON.parse(localStorage.getItem("accessToken"));
//     api
//       .get(`/api/instructor/${account.instructorID}/coursesOfInstructor`)
//       .then((response) => {
//         setCourses(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching courses:", error);
//       });
//   };

//   useEffect(() => {
//     fetchCourse();
//   }, []);

//   const handleCourseClick = (courseID) => {
//     setSelectedCourseId(courseID);
//     setSelectedChapterId(null);
//   };

//   const fetchChapter = (selectedCourseId) => {
//     api
//       .get(`/api/course/${selectedCourseId}/chapters`)
//       .then((response) => {
//         setChapters(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching chapters:", error);
//       });
//   };

//   useEffect(() => {
//     if (selectedCourseId) {
//       fetchChapter(selectedCourseId);
//     }
//   }, [selectedCourseId]);

//   const handleChapterClick = (chapterID) => {
//     setSelectedChapterId(chapterID);
//   };

//   const fetchItem = (selectedChapterId) => {
//     api
//       .get(`/api/chapter/${selectedChapterId}/items`)
//       .then((response) => {
//         setItems(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching items:", error);
//       });
//   };

//   useEffect(() => {
//     if (selectedChapterId) {
//       fetchItem(selectedChapterId);
//     }
//   }, [selectedChapterId]);

//   const MenuSidebar = () => {
//     return (
//       <Menu
//         mode="inline"
//         selectedKeys={[selectedChapterId?.toString()]}
//         defaultOpenKeys={selectedCourseId ? [selectedCourseId.toString()] : []}
//       >
//         {courses.map((course) => {
//           const chapterCourse = chapters.filter(
//             (chapter) => chapter.courseID === course.courseID
//           );
//           return (
//             <Menu.SubMenu
//               key={course.courseID}
//               title={course.name}
//               onTitleClick={handleCourseClick(course.courseID)}
//               popupOffset={[0, -10]}
//               popupClassName="submenu-popup"
//             >
//               {chapterCourse.map((chapter) => (
//                 <Menu.Item
//                   key={chapter.itemID}
//                   onClick={() => handleChapterClick(chapter.chapterID)}
//                 >
//                   <Typography.Text>{chapter.chapterName}</Typography.Text>
//                 </Menu.Item>
//               ))}
//             </Menu.SubMenu>
//           );
//         })}
//       </Menu>
//     );
//   };

//   return (
//     <div>
//       <Layout style={{ minHeight: "100vh" }}>
//         <Sider theme="light" width={200}>
//           <MenuSidebar />
//         </Sider>
//         {/* <Layout>
//         <Content>{items}</Content>
//       </Layout> */}
//       </Layout>
//       {/* <Menu mode="inline" onClick={handleCourseClick} style={{ width: 200 }}>
//         {courses.map(course => (
//           <Menu.Item key={course.courseID}>{course.name}</Menu.Item>
//         ))}
//       </Menu>

//       {selectedCourseId && (
//         <div style={{ marginLeft: 210 }}>
//           <h2>Selected Course: {selectedCourseId}</h2>
//           <Menu mode="vertical" onClick={handleChapterClick} style={{ width: 200 }}>
//             {chapters.map(chapter => (
//               <Menu.Item key={chapter.chapterID}>{chapter.chapterName}</Menu.Item>
//             ))}
//           </Menu>
//         </div>
//       )}

//       {selectedChapterId && (
//         <div style={{ marginLeft: 410 }}>
//           <h2>Selected Chapter: {selectedChapterId}</h2>
//           <Menu mode="inline" style={{ width: 200 }}>
//             {items.map(item => (
//               <Menu.Item key={item.itemID}>{item.itemName}</Menu.Item>
//             ))}
//           </Menu>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default InlineMenu;
