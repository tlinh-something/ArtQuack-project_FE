import { useEffect } from "react";
import api from "../../config/axios"

function ViewStatusCourse (){

    const account = JSON.parse(localStorage.getItem('accessToken'))
    const fetch = () => {
        api.get(`/api/instructor/${account.instructorID}/coursesOfInstructor`)
        .then(response => {console.log(response.data);})
    }

    useEffect(()=>{
        fetch()
    }, [])
}

export default ViewStatusCourse