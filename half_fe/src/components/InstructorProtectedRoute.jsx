import { Link, Route } from "react-router-dom";
import React from "react"

function InstructorProtectedRoute(props) {
    if (localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken")).role == 'instructor') {
        return <Route {...props} />
    }
    return <Link to="/" />;
};

export default InstructorProtectedRoute;