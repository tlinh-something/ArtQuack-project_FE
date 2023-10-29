import { Link, Route } from "react-router-dom";
import React from "react"

function LearnerProtectedRoute(props) {
    if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role == 'learner') {
        return <Route {...props} />
    }
    return <Link to="/" />;
};

export default LearnerProtectedRoute;