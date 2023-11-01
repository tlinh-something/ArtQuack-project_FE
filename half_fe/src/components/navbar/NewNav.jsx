import { useEffect, useState } from "react";
import NavbarUser from "../UserPage/NavbarUser";
import Navbar from "./NarbarIns";
import Navbar2 from "./Navbar";

const NavBarNew = () => {
  const account = JSON.parse(localStorage.getItem("accessToken"));

  if (account?.role === "learner") {
    return <NavbarUser />;
  } else if (account?.role === "instructor") {
    return <Navbar />;
  } else {
    return <Navbar2 />;
  }
};

export default NavBarNew;
