import { useEffect, useState } from "react";
import NavbarUser from "../UserPage/NavbarUser";
import Navbar from "./NarbarIns";
import NavbarSearch from "./NavbarSearch";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const NavBarNew = () => {
  const account = JSON.parse(localStorage.getItem("accessToken"));
  // const navigate = useNavigate()
  // const onChange = (key) => {
  //   console.log(key);
  // };
  // const items = [
  //   {
  //     key: "1",
  //     label: `${account.learnerID ? "My Learning" : "My Course"}`,
  //     children: `${
  //       account.learnerID ? navigate(`/user/mycourse`) : navigate(`/instructor/mycourse`)
  //     }`,
  //   },
  //   {
  //     key: "2",
  //     label: `${account.learnerID ? "My Submission" : "Grade Submission"}`,
  //     children: `${
  //       account.learnerID ? navigate(`/user/submission`) : navigate(`/instructor/submission`)
  //     }`,
  //   },
  // ];

  if (account?.role === "learner") {
    // return <NavbarUser />;
    // return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    return <NavbarSearch />;
  } else if (account?.role === "instructor") {
    // return <Navbar />;
    return <NavbarSearch />;
  } else {
    return <NavbarSearch />;
  }
};

export default NavBarNew;
