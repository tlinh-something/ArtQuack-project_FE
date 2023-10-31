import axios from "axios";
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import './AddCourse.css'
import { Form } from "react-bootstrap";


function AddChapter() {

    const params = useParams()
    const courseId = params.id
    const [input, setInput] = useState([{courseId: courseId, name: '', description: '', status: true}])

    const handleFormChange = (e, index) => {
        let data = [...input];
        data[index][e.target.name] = e.target.value;
        setInput(data);
    }

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/chapter", ...input)
        .then(response => {
            console.log(response.data)
            alert("Add Chapter Successfully");
            navigate('/mycourse')
        })
        .catch(error => {
            console.log(error);
        })
    }

    // add and remove fields for chapter
    const add = () => {
        let newfield = { courseId: courseId, name: '', description: ''}
        setInput([...input, newfield]);
    }

    const remove = (index) => {
        let data = [...input];
        data.splice(index, 1)
        setInput(data)
    }
    

    return(
        
        <Form.Group>
            <h2>Add Chapter</h2>
            <form onSubmit={handleSubmit}>
                {input.map((value, index) => {
                    return (
                        <div key={index}>
                            {/* <input type="hidden" name='courseId' value={(params.id)} /> */}
                            <input id='add-course' className="mb-3 ms-2"
                                name = 'name'
                                placeholder="chaptername"
                                value={value.name}
                                onChange={(e) => handleFormChange(e, index)} />

                            <input id='add-course' className="mb-3 ms-2"
                                name = 'description'
                                placeholder="des"
                                value={value.description}
                                onChange={(e) => handleFormChange(e, index)} />

                            <button onClick={() => remove(index)}>Remove</button>
                        </div>
                    )
                })}
                {/* <button>Save</button> */}
            </form>
                <button onClick={add}>More chapter</button>
                <button onClick={handleSubmit}>Save</button>
                <Link to={'/instructor/mycourse'}>Back</Link>
        </Form.Group>
    )
}

export default AddChapter