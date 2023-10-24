import axios from "axios";
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import './AddCourse.css'


function AddItem() {

    const params = useParams()
    const courseId = params.id
    const [input, setInput] = useState([{chapterId: courseId, name: '', content: '', id: ''}])
    
    const handleFormChange = (e, index) => {
        let data = [...input];
        data[index][e.target.name] = e.target.value;
        setInput(data);
    }

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/item", input)
        .then(response => {
            console.log(response.data)
            console.log(input)
            alert("Add Topic Successfully");
            navigate('/mycourse')
        })
        .catch(error => {
            console.log(error);
        })
    }

    //add and remove fields for item
    const add = () => {
        let newfield = { chapterId: courseId, name: '', content: ''}
        setInput([...input, newfield]);
    }

    const remove = (index) => {
        let data = [...input];
        data.splice(index, 1)
        setInput(data)
    }

    

    return(
        
        <div>
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                {input.map((value, index) => {
                    return (
                        <div key={index}>
                            {/* <input type="hidden" name='courseId' value={(params.id)} /> */}
                            <input id='add-course' className="mb-3 ms-2"
                                name = 'name'
                                placeholder="itemname"
                                value={value.name}
                                onChange={(e) => handleFormChange(e, index)} />

                            <input id='add-course' className="mb-3"
                                name="content"
                                placeholder="content, it can be video's url or documents"
                                value={value.content}
                                onChange={(e) => handleFormChange(e, index)} />

                            <button onClick={() => remove(index)}>Remove</button>
                        </div>
                    )
                })}
            </form>
                <button onClick={add}>More item</button>
                <button onClick={handleSubmit}>Save</button>
                <Link to={'/mycourse'}>Back</Link>
        </div>
    )
}

export default AddItem