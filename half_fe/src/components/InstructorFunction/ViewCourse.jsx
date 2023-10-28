import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


function ViewCourse() {

    const [chapter, setChapter] = useState()
    const {id} = useParams()
    const navigate = useNavigate()
    // const params = useParams()
    // const tp = params.courseId

    useEffect(() => {
        axios.get("http://localhost:3000/chapter?courseId=" + id)
        .then (response => {
            setChapter(response.data)
        })
    })

    return (
        <div>
            <form>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Chapter Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        { chapter?.map((data, i) => (
                            <tr key={i}>
                                <td>{data.id}</td>
                                <td>
                                    <a href={`/instructor/item/${data.id}`}>{data.name}</a>
                                </td>
                                <td><Link to={`/instructor/additem/${data.id}`}>Add item</Link></td>
                                <td><Link onClick={() => handleDelete(data.id)}>Delete</Link></td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </form>
            <Link to={'/instructor/mycourse'}>Back</Link>
        </div>
    );

    function handleDelete(id) {
        const confirm = window.confirm("Do you want to delete?")
        if(confirm){
            axios.delete('http://localhost:3000/chapter/' + id)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
                alert('Chapter has deleted');
                navigate('/instructor/mycourse');
            })
            .catch(error => console.log(error))
        }
    }
}
export default ViewCourse