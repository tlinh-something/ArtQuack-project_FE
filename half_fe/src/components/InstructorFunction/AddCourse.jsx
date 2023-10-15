import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import './AddCourse.css'
import { useCoursesContext } from '../context/course_context';
import { Link, useNavigate, useParams } from "react-router-dom";
import InstructorNav from "./InstructorNav";
//import axios from "axios";

function Add(){
    const [inputForm, setInputForm] = useState([{coursename: '',topicName: '', video: '', description: '', level: '', category: ''},]);

    //const handleClick = () => setCountForm(countForm + 1)
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(inputForm)

    //     axios.post('/createcourse')
    //     .then(res => {
    //         setInputForm({inputForm : res.data});
    //     })
    //     .catch((error) => {console.log(error)}) 
    // }

    const handleFormChange = (e, index) => {
        let data = [...inputForm];
        data[index][e.target.name] = e.target.value;
        setInputForm(data);
    }

    const add = () => {
        let newfield = {topicName: '', video: '', description: ''}
        setInputForm([...inputForm, newfield]);
    }

    const remove = (index) => {
        let data = [...inputForm];
        data.splice(index, 1)
        setInputForm(data)
    }

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if ( id !== 'createcourse') {
            fetch(`/editcourse/${id}`)
            .then(res => res.json())
            .then(data => setInputForm(data));
        }
    }, [id, setInputForm]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     setInputForm({...inputForm, [name]: value})
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/editcourse${inputForm.id ? `/${inputForm.id}` : '' }`, {
            method: (inputForm.id) ? 'put' : 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputForm)
        });
        setInputForm(inputForm);
        navigate('/course');
    }

    const title = <h2>{inputForm.id ? 'Edit' : 'Add'}</h2>

    const {categories} = useCoursesContext();

    return(
        <>
        <InstructorNav />
        {title}

        <Form.Group className="topic" onSubmit={handleSubmit}>
            {/* <div>
                {inputForm.map((input, index) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <div>
                        <Form.Label>Course Name</Form.Label>
                            <input type="text" name="coursename" id="add-course"
                            style={{fontSize: '14px', marginLeft: '10px'}}
                            value={input.coursename}
                            onChange={(e) => handleFormChange(e, index)} />
                            </div>
                    )
                })}
            </div> */}
           
            {/* <div className="top-course mt-3">
            

            
            </div> */}

            <form >
                {inputForm.map((input, index) => {
                    return (
                        <div key={index} className="form-add-course mt-5">
                            <Form.Label>Course Name</Form.Label>
                            <input type="text" name="coursename" id="add-course"
                            style={{fontSize: '14px', marginLeft: '10px'}}
                            value={input.coursename}
                            onChange={(e) => handleFormChange(e, index)} />

                            <div className="flex mt-3">
                            <Form.Select id="level" style={{fontSize: '14px'}} name="category" onChange={(e) => handleFormChange(e, index)}>
                                <option>Category</option>
                                { categories.map((category, index) => {
                                    return (
                                        <option className='sidebar-link-item fw-5' key = {index}>
                                        <Link to = {`category/${category}`} value={`${category}`}>{category}</Link>
                                        </option>
                                    )})
                                }
                            </Form.Select>


                            <Form.Select id="level" style={{fontSize: '14px'}} name="level" onChange={(e) => handleFormChange(e, index)}>
                                <option>Select level of course</option>
                                <option value='1'>Easy</option>
                                <option value='2'>Medium</option>
                                <option value='3'>Hard</option>
                            </Form.Select>
                            </div>

                            <input id="add-course" className="mb-3"
                            name = 'topicName'
                            placeholder="topicname"
                            value={input.topicName}
                            onChange={(e) => handleFormChange(e, index)} />

                            <input id="add-course" className="mb-3"
                            name="video"
                            placeholder="url video"
                            value={input.video}
                            onChange={(e) => handleFormChange(e, index)} />

                            <input id="add-course" className="mb-3"
                            name="description"
                            placeholder="mota"
                            value={input.description}
                            onChange={(e) => handleFormChange(e, index)} />

                            <button onClick={() => remove(index)}>Remove</button>
                        </div>
                    )
                })}
            </form>
            {/* <Form.Group>
                <Form.Label>Topic Name</Form.Label>
                <Form.Control type="text" />
                <Form.Label>Add video</Form.Label>
                <Form.Control type="file" />
                <Form.Control as="textarea" rows={3} placeholder="Description"/>
            </Form.Group> */}
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={add}>Add topic</button>
                            
        </Form.Group>
        </>
    );
}

export default Add;