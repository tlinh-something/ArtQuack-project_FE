// import axios from "axios";
// //import { useCallback } from "react";
// import api from '../api/axios';
// import { useEffect, useState } from "react";
// // class CourseService {
// //     getCourse() {
// //         axios.get(COURSE_API_URL)
// //         .then (function(response) {
// //             return response.json();
// //         })
// //         // .then(useCallback);

// //     }
// // } 

// //export default new CourseService()

// function CourseService () {
//     const [course, setCourse] = useState([]);

//     const getCourse = async() => {
//         const response = await api.get("/course");
//         return response.data;
//     };

//     const addCourse = async(course) => {
//         console.log(course);
//         const request = {
//             id: id(),
//             ...course
//         }
//         const response = await api.post("/course", request)
//         setCourse([...course, response.data]);
//     }

//     const removeCourse = async(id) => {
//         await api.delete(`/course/${id}`);
//         const newCourseList = course.filter((course) => {
//             return course.id !== id;
//         })
//         setCourse(newCourseList);
//     }

//     useEffect(() => {
//         const getAllCourse = async () => {
//             const allCourse = await getCourse();
//             if (allCourse){
//                 setCourse(allCourse);
//             }
//         }
//         getAllCourse();
//     }, [])

//     useEffect(() => {
//         localStorage.setItem(Key, JSON.stringify(course));
//     }, [course]);
// }

// export default CourseService;