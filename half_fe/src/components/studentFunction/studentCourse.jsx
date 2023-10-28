import axios from "axios"
import { useEffect } from "react"

function StudentCourse() {
    useEffect(() => {
        const getEnroll = axios.get('http://localhost:3000/enroll?studentId=')
    })
    
    return(
        <>
        </>
    )
}
export default StudentCourse