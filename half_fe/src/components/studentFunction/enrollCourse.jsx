import axios from "axios"
import { useParams } from "react-router-dom";

function EnrollCourse({studentId}) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const params = useParams()
    const {id} = params.id

    const handleEnroll = () => {
        const enrollData = {
            courseId: id,
            studentId: studentId,
            enroll_date: formattedDate
        }
            axios.post('http://localhost:3000/enroll', enrollData)
            .then(response => {
                console.log('Enrollment saved successfully: ', response)
            })
            .catch(error => console.log(error))
    }
    
    return(
        <button onClick={handleEnroll}>Enroll</button>
    )
}

export default EnrollCourse