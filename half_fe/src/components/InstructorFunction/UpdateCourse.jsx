import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

function Update(){

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [level, setLevel] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('http://localhost:3000/course/' + id)
    //     .then(res => setData(res.data))
    //     .catch(error => console.log(error))
    // }, [id])
    const params = useParams();
    const courseId = params.id;

    useEffect(() => {
        const getCate = axios.get("http://localhost:3000/category");
        const getLevel = axios.get("http://localhost:3000/level");
        const getTopic = axios.get("http://localhost:3000/topic/" + courseId);
        const getCourse = axios.get('http://localhost:3000/course/' + id);
        Promise.all([getCate, getLevel, getTopic, getCourse])
        .then(crs => {
            return Promise.all(crs.map(response => response.data))
        })
        .then(([cate, lv, data]) => {
            setCategory(cate);
            setLevel(lv);
            setData(data);
        })
        .catch(error => console.log(error))
    })

    // const handleFormChange = (e, index) => {
    //     let data = [...inputForm];
    //     data[index][e.target.name] = e.target.value;
    //     setInputForm(data);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.put('http://localhost:3000/course/' + id, data)
        // .then(response => {
        //     console.log(response.data);
        //     alert("Update successfully");
        //     navigate('/mycourse');
        // })
        // .catch(error => console.log(error))
        const UpdateCourse = axios.put('http://localhost:3000/course/' + id, data)
        const updateTopic = axios.put('http://localhost:3000/topic/' + courseId, data)
        Promise.all([ UpdateCourse, updateTopic ])
        .then((res) => {
            Promise.all(res.map(response => response.data))
            alert("Update successfully");
            navigate('/mycourse');
        })
        .catch((error) => console.log(error))
    }

    return(
        <div className="form-add-course mt-5">
            <form onSubmit={handleSubmit}>
                <Form.Label>Course Name</Form.Label>
                    <input type="text" name="name" id="add-course"
                        style={{fontSize: '14px', marginLeft: '10px'}}
                        value={data.name} 
                        onChange={(e) => setData({ ...data, name: e.target.value })}/>

                    <div className="flex mt-3">
                        <Form.Select id="level" style={{fontSize: '14px'}} name="category" onChange={(e) => setData({...data, category: e.target.value })}>
                            <option>Select category</option>
                            { category.map((category, i) => {
                                return (
                                    <option className='sidebar-link-item fw-5' key = {i}>{category.name}</option>
                                )})
                            }
                        </Form.Select>


                        <Form.Select id="level" style={{fontSize: '14px'}} name="level" onChange={(e) => ({...data, level: e.target.value })}>
                            <option>Select level</option>
                            { level.map((level, i) => {
                                return (
                                    <option className='sidebar-link-item fw-5' key={i}>{level.name}</option>
                                )
                            })}
                        </Form.Select>
                    </div>

                    {/* <input id="add-course" className="mb-3"
                        name = 'topicName'
                        placeholder="topicname"
                        value={data.topicName} 
                        onChange={(e) => setData({ ...data, topicName: e.target.value })} />

                    <input id="add-course" className="mb-3"
                        name="video"
                        placeholder="url video"
                        value={data.video} 
                        onChange={(e) => setData({ ...data, video: e.target.value })} /> */}

                    <input id="add-course" className="mb-3"
                        name="description"
                        placeholder="mota"
                        value={data.description} 
                        onChange={(e) => setData({ ...data, description: e.target.value })} />

                    {/* <input id="add-course" className="mb-3"
                        name="artwork"
                        placeholder="homework"
                        value={data.artwork}
                        onChange={(e) => setData({ ...data, artwork: e.target.value })} /> */}
            
                <button>Submit</button>
            </form>
            
        </div>
    )
}
export default Update