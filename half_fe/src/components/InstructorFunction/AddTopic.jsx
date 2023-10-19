import axios from "axios";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import './AddCourse.css'


function AddTopic() {

    const params = useParams()
    const courseId = params.id
    const [input, setInput] = useState([{courseId: courseId, topicName: '', videoURL: '', id: ''}])
    
    const handleFormChange = (e, index) => {
        let data = [...input];
        data[index][e.target.name] = e.target.value;
        setInput(data);
    }

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/topic", input)
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

    const add = () => {
        let newfield = { courseId: courseId,topicName: '', videoURL: ''}
        setInput([...input, newfield]);
    }

    const remove = (index) => {
        let data = [...input];
        data.splice(index, 1)
        setInput(data)
    }

    

    return(
        
        <div>
            <h2>Add topic</h2>
            <form onSubmit={handleSubmit}>
                {input.map((value, index) => {
                    return (
                        <div key={index}>
                            {/* <input type="hidden" name='courseId' value={(params.id)} /> */}
                            <input id='add-course' className="mb-3 ms-2"
                                name = 'topicName'
                                placeholder="topicname"
                                value={value.topicName}
                                onChange={(e) => handleFormChange(e, index)} />

                            <input id='add-course' className="mb-3"
                                name="videoURL"
                                placeholder="url video"
                                value={value.videoURL}
                                onChange={(e) => handleFormChange(e, index)} />

                            {/* <input className="mb-3"
                                name="artwork"
                                placeholder="homework"
                                value={value.artwork}
                                onChange={(e) => handleFormChange(e, index)} /> */}

                            <button onClick={() => remove(index)}>Remove</button>
                        </div>
                    )
                })}
            </form>
                <button onClick={add}>Add topic</button>
                <button onClick={handleSubmit}>Submit</button>
            
        </div>
    )
}

export default AddTopic