// import { Form } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import './AddCourse.css';
// import { useNavigate } from "react-router-dom";
// //import InstructorNav from "./InstructorNav";
// import axios from "axios";

// function Add(){
//     const user = localStorage.getItem("role");
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     const formattedDate = `${year}-${month}-${day}`;

//     const [inputForm, setInputForm] = useState([{name: '', description: '', level: '', category: '', date: formattedDate, status: true, rate: '4'}]);
//     const [category, setCategory] = useState([]);
//     const [level, setLevel] = useState([]);
//     const [instructor,setInstructor]=useState([]);
    

//     const handleFormChange = (e, index) => {
//         let data = [...inputForm];
//         data[index][e.target.name] = e.target.value;
//         setInputForm(data);
//     }

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         axios.post(`http://http://167.172.92.40:8080/instructor/${inputForm.category}`, ...inputForm)
//         .then(response => {
//             console.log(response.data)
//             alert("Course Added Successfully");
//             navigate('/mycourse')
//         })
//         .catch(error => {
//             console.log(error);
//         })
//     }

//     useEffect(() => {
//         const getCate = axios.get("http://167.172.92.40:8080/api/categories");
//         const getLevel = axios.get("http://167.172.92.40:8080/api/levels");
//         Promise.all([getCate, getLevel])
//         .then(data => {
//             return Promise.all(data.map(res => res.data))
//         })
//         .then(([cate, lv,ins]) => {
//             setCategory(cate);
//             setLevel(lv);
//             setInstructor(ins);
//             console.log(cate,lv,ins);
//         })
//         .catch(error => console.log(error))
//     },[])

//     return(
//         <>
        
//         <Form.Group className="topic h-100" >
//             <form className='form-add-course mt-5 mx-auto' onSubmit={handleSubmit}>
//                 {inputForm.map((input, index) => {
//                     return (
//                         <div key={index} className="mt-3">
                            
//                             <Form.Label style={{fontSize: '15px'}}>Course Name</Form.Label>
//                             <input type="text" name="name" id="add-course"
//                                 style={{fontSize: '14px', marginLeft: '10px'}}
//                                 value={input.name}
//                                 onChange={(e) => handleFormChange(e, index)} />

//                             <div className="flex flex-center mt-3">
//                                 <Form.Select id="level" style={{fontSize: '15px'}} name="category" onChange={(e) => handleFormChange(e, index)}>
//                                     <option>Select category</option>
//                                     { category.map((category, i) => {
//                                         return (
//                                             <option className='sidebar-link-item fw-5' key = {i}>
//                                                 {category.cateName}
//                                                 </option>
//                                         )})
//                                     }
//                                 </Form.Select>


//                                 <Form.Select id="level" style={{fontSize: '15px'}} name="level" onChange={(e) => handleFormChange(e, index)}>
//                                     <option>Select level</option>
//                                     { level.map((level, i) => {
//                                         return (
//                                             <option className='sidebar-link-item fw-5' key={i}>{level.levelName}</option>
//                                         )
//                                     })}
//                                 </Form.Select>
                                
//                             </div>
                            
//                             <Form.Label style={{fontSize: '15px'}}>Description</Form.Label>
//                             <input id="add-course" className="mt-4"
//                                 style={{fontSize: '15px', width: '50%', marginLeft: '10px'}}
//                                 name="description"
//                                 value={input.description}
//                                 onChange={(e) => handleFormChange(e, index)} />
//                         </div>
//                     )
//                 })}
//                 <button className='confirm-add mb-4'>Submit</button>
//             </form>
                            
//         </Form.Group>
//         </>
//     );
// }

// export default Add;