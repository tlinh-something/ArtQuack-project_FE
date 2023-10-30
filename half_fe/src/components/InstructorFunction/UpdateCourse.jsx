import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
  const { courseID } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch course data using the courseId
    axios
      .get(`http://167.172.92.40:8080/api/course/${courseID}`)
      .then(response => {
        const { name, description } = response.data;
        setName(name);
        setDescription(description);
      })
      .catch(error => {
        console.log(error);
      });
  }, [courseID]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Update course data
      const updatedCourse = { name, description };
      await axios.put(`http://167.172.92.40:8080/api/course/${courseID}`, updatedCourse);

      // Handle successful update
      console.log('Course updated successfully!');
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Course Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Course Description:</label>
          <input
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></input>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCourse;