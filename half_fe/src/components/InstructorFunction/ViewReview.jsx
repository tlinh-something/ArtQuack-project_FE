import { Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewReview() {
  const [review, setReview] = useState([]);
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    const getReview = axios.get('http://localhost:3000/review');
    const getLearner = axios.get('http://localhost:3000/student');
    Promise.all([getReview, getLearner])
      .then(data => Promise.all(data.map(response => response.data)))
      .then(([reviewData, userReviewData]) => {
        setReview(reviewData);
        setUserReview(userReviewData);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h3 className="mt-3">List review of all courses</h3>
      {review.map((data, i) => {
        const matchingStudent = userReview.find(learner => learner.id === data.studentId);
        return (
          <Card
            className="ml-2"
            key={i}
            title={matchingStudent ? matchingStudent.name : 'Unknown Student'}
          >
            <p>{data.comment}</p>
            
          </Card>
        );
      })}
    </div>
  );
}

export default ViewReview;