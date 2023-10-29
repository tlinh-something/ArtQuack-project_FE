import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
// import Navbar from '../navbar/NarbarIns';

function MyCourse() {

    const [course, setCourse] = useState([]);
    const navigate = useNavigate();
    const [displayForm, setDisplayForm] = useState(false)

    const handleLink = () => {
        setDisplayForm(!displayForm)
    }

    useEffect(() => {
        axios.get("http://localhost:3000/course/")
        //axios.get("http://localhost:8080/api/instructor/{instructorID}/coursesOfInstructor")
        .then (response => {
            setCourse(response.data)
        })
    })

        return (
            
            <div className='display-form-add'>
                {/* <Navbar /> */}
                <Card className='w-50 add-form'>
                    <Row>
                        <Col span={12} style={{fontSize: '16px'}}>Create more course?</Col>
                        <Col span={12}>
                            <Link to='add' className='flex flex-end' 
                            onClick={handleLink} 
                            style={{ fontWeight:'600', fontSize: '16px',color: displayForm ? '#fc4a1a' : '#000'}}>Add Course</Link>
                        </Col>
                    </Row>
                </Card>

                {displayForm && <Outlet />}
                
                <div className="table-responsive mx-auto" style={{width: "80%"}}>
                <table className='display-page-course table table-hover'>
                    <thead>
                        <tr>
                            <th scope="col" >ID</th>
                            <th scope="col" >Course Name</th>
                            <th scope="col" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { course.map((data, i) => (
                            <tr key={i}>
                                <td scope="row">{data.id}</td>
                                <td>
                                    <a href={`/instructor/chapter/${data.id}`}>{data.name}</a>
                                </td>
                                {/* <td>{data.description}</td> */}
                                <td>
                                    <Link to={`/instructor/addchapter/${data.id}`} className='btn-confirm'>Add chapter</Link>
                                    <Link to={`/instructor/update/${data.id}`} className='btn-confirm ms-1'>Update</Link>
                                    {/* <Link to={`/delete/${data.id}`} className='btn btn-danger ms-1'>Delete</Link> */}
                                    <Link onClick={() => handleDelete(data.id)} className='btn-confirm ms-1'>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div> 
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