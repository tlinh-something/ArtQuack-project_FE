import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const [courseEdit, setCourseEdit] = useState({
    name: "",
    description: "",
    upload_date: "",
  });

  useEffect(() => {
    // Fetch course data using the courseId
    const updateCourse = async () => {
      await axios
        .get(`http://167.172.92.40:8080/api/course/${courseID}`)
        .then((response) => {
          setCourseEdit(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    updateCourse();
  }, []);
  const handleEdit = (e) => {
    setCourseEdit({ ...courseEdit, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update course data
      const updatedCourse = await axios.put(
        `http://167.172.92.40:8080/api/course/${courseID}/updatecourse`,
        courseEdit
      );

      // Handle successful update

      navigate("/instructor/mycourse");
      window.alert("Update successful!");
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div>
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Course Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={courseEdit.name}
              onChange={(e) => handleEdit(e)}
            />
          </div>
          <div>
            <label htmlFor="description">Course Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={courseEdit.description}
              onChange={(e) => handleEdit(e)}
            />
          </div>
          <div>
            <label htmlFor="upload_date">Course Upload_date:</label>
            <input
              type="text"
              id="upload_date"
              name="upload_date"
              value={courseEdit.upload_date}
              onChange={(e) => handleEdit(e)}
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateCourse;
