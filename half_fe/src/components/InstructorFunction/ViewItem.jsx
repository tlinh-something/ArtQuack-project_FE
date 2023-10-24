import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


function ViewItem() {

    const [item, setItem] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    // const params = useParams()
    // const tp = params.courseId

    useEffect(() => {
        axios.get("http://localhost:3000/item?chapterId=" + id)
        .then (response => {
            setItem(response.data)
        })
    })

    return (
        <div>
            <div>
                <form>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Item Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        { item.map((data, i) => (
                            <tr key={i}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td><Link onClick={() => handleDelete(data.id)}>Delete</Link></td>
                            </tr>
                        ))}
                        
                    </tbody>
                </form>
            </div>
        </div>
    );

    function handleDelete(id) {
        const confirm = window.confirm("Do you want to delete?")
        if(confirm){
            axios.delete('http://localhost:3000/item/' + id)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
                alert('Chapter has deleted');
                navigate('/mycourse');
            })
            .catch(error => console.log(error))
        }
    }
}
export default ViewItem