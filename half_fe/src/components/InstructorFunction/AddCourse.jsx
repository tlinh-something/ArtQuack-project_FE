import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import './AddCourse.css';
import { useNavigate } from "react-router-dom";
//import InstructorNav from "./InstructorNav";
import axios from "axios";

function Add(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [inputForm, setInputForm] = useState([{name: '', description: '', level: '', category: '', date: formattedDate, status: true, rate: '4'}]);
    const [category, setCategory] = useState([]);
    const [level, setLevel] = useState([]);

    

    const handleFormChange = (e, index) => {
        let data = [...inputForm];
        data[index][e.target.name] = e.target.value;
        setInputForm(data);
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/course", ...inputForm)
        .then(response => {
            console.log(response.data)
            alert("Course Added Successfully");
            navigate('/mycourse')
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        const getCate = axios.get("http://localhost:3000/category");
        const getLevel = axios.get("http://localhost:3000/level");
        Promise.all([getCate, getLevel])
        .then(data => {
            return Promise.all(data.map(res => res.data))
        })
        .then(([cate, lv]) => {
            setCategory(cate);
            setLevel(lv);
        })
        .catch(error => console.log(error))
    })

    return(
        <>
        {/* <InstructorNav /> */}

        <Form.Group className="topic h-100" >
            <form onSubmit={handleSubmit}>
                {inputForm.map((input, index) => {
                    return (
                        <div key={index} className="form-add-course mt-5">
                            
                            <Form.Label>Course Name</Form.Label>
                            <input type="text" name="name" id="add-course"
                                style={{fontSize: '14px', marginLeft: '10px'}}
                                value={input.name}
                                onChange={(e) => handleFormChange(e, index)} />

                            <div className="flex mt-3">
                                <Form.Select id="level" style={{fontSize: '14px'}} name="category" onChange={(e) => handleFormChange(e, index)}>
                                    <option>Select category</option>
                                    { category.map((category, i) => {
                                        return (
                                            <option className='sidebar-link-item fw-5' key = {i}>{category.name}</option>
                                        )})
                                    }
                                </Form.Select>


                                <Form.Select id="level" style={{fontSize: '14px'}} name="level" onChange={(e) => handleFormChange(e, index)}>
                                    <option>Select level</option>
                                    { level.map((level, i) => {
                                        return (
                                            <option className='sidebar-link-item fw-5' key={i}>{level.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>

                            <input id="add-course" className="mb-3 w-100"
                                name="description"
                                placeholder="description"
                                value={input.description}
                                onChange={(e) => handleFormChange(e, index)} />
                        </div>
                    )
                })}
                <button >Submit</button>
            </form>
                            
        </Form.Group>
        </>
    );
}

export default Add;