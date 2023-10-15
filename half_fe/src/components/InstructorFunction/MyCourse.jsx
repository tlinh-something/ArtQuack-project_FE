import { Component } from 'react';
import instructorService from '../../services/instructorService';
import { Link } from 'react-router-dom';

class MyCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        instructorService.getCourse().then((res) => {
            this.setState({courses : res.data})
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Link to='/createcourse'>Add Course</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Course Id</th>
                            <th>Course Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.courses.map(
                                course =>
                                <tr key={course.courseID}>
                                    <td>{course.name}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    <Link to='editcourse'>Edit</Link>
                </table>
            </div>
        );
    }
}

export default MyCourse;