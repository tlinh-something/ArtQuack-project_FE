import axios from "axios";

const COURSE_API_URL = "http://localhost:8080/api/course";

class CourseService {
    getCourse() {
        return axios.get(COURSE_API_URL);
    }
}

export default new CourseService()