import { Link, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LearnerProtectedRoute(props) {
  const navigate = useNavigate();

  if (localStorage.getItem('accessToken')) {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken.role === 'learner') {
      return <Route {...props} />;
    }
  }

  navigate('/'); // Redirect to home page if user is not logged in or doesn't have the learner role
  return null; // Or you can render a specific component for unauthorized access
}

export default LearnerProtectedRoute;