import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

function MyCourse() {

    const [course, setCourse] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/course/")
        .then (response => {
            setCourse(response.data)
        })
    })
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
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { course.map((data, i) => (
                            <tr key={i}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.description}</td>
                                <td>
                                    <Link to={`/addtopic/${data.id}`} className='btn btn-primary'>Add topic</Link>
                                    <Link to={`/update/${data.id}`} className='btn btn-success ms-1'>Update</Link>
                                    <Link to={`/delete/${data.id}`} className='btn btn-danger ms-1'>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Outlet />
            </div>
        );
    //}
}

export default MyCourse;