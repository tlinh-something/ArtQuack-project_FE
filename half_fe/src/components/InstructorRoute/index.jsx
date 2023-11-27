import { Outlet } from "react-router-dom";

const InstructorRoute = () => {
  const account = JSON.parse(localStorage.getItem("accessToken"));
  if (!account?.instructorID) {
    window.location.href = "/login/v2";
  }

  if (account?.instructorID) {
    return <Outlet />;
  }
};

export default InstructorRoute;
