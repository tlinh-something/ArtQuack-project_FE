import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyCourse() {

    const [course, setCourse] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get("http://167.172.92.40:8080/api/courses")
        //axios.get("http://localhost:8080/api/instructor/{instructorID}/coursesOfInstructor")
        .then (response => {
            setCourse(response.data)
            console.log(response.data);
        })
    },[])

        return (
            <div>
                <nav>
                    <Link to='add' >Add Course</Link>
                </nav>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            {/* <th>Description</th>
                            <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        { course.map((data, i) => (
                            <tr key={i}>
                                <td>{data.id}</td>
                                <td>
                                    <a href={`/instructor/chapter/${data.id}`}>{data.name}</a>
                                </td>
                                {/* <td>{data.description}</td> */}
                                
                                <td>

                                    <Link to={`/instructor/addchapter/${data.courseID}`} className='btn btn-primary'>Add chapter</Link>
                                    <Link to={`/instructor/update/${data.courseID}`} className='btn btn-success ms-1'>Update</Link>
                                    {/* <Link to={`/delete/${data.id}`} className='btn btn-danger ms-1'>Delete</Link> */}
                                    <button onClick={async () => {
                                        console.log(data);
                                        const response = await axios.delete(`http://167.172.92.40:8080/api/deletecourse/${data.courseID}`)
                                        console.log(response);
                                    }} className='btn btn-danger ms-1'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Outlet />
            </div>
        );

        function handleDelete(id) {
            const confirm = window.confirm("Do you want to delete?")
            if(confirm){
                axios.delete('http://localhost:3000/course/' + id)
                // axios.delete(`http://localhost:3000/deletecourse/` + id)
                // eslint-disable-next-line no-unused-vars
                .then(res => {
                    alert('Course has deleted');
                    navigate('/mycourse');
                })
                .catch(error => console.log(error))
            }
        }
}

export default MyCourse;