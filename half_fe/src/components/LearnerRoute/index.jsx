import { Outlet } from "react-router-dom";

const LearnerRoute = () => {
  const account = JSON.parse(localStorage.getItem("accessToken"));
  if (!account?.learnerID) {
    window.location.href = "/login/v2";
  }

  if (account?.learnerID) {
    return <Outlet />;
  }
};

export default LearnerRoute;
