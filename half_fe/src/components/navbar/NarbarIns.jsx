//import React from 'react';
import styled from "styled-components";
// import {MdMenu} from "react-icons/md";
// import { useSidebarContext } from '../context/sidebar_context';
import { Link } from "react-router-dom";
//import { useCartContext } from './context/cart_context';
//import SearchBar from '../SearchBar';
//import '../components/Test.css';
import "../Test.css";
import UserDropdown from "../UserPage/UserDropdown";
// import Nav from 'react-bootstrap/Nav';
//import { Stack } from "react-bootstrap";

const Navbar = () => {
  return (
    <>
      <NavbarWrapper className="bg-white flex" direction="horizontal" gap={6}>
        <div className="container">
          <div className="brand-and-toggler flex flex-between w-100">
            <div className="p-2">
              <ul>
                <Link
                  to="/instructor"
                  className="navbar-brand text-uppercase ls-1 fw-8"
                >
                  <span className="topic">A</span>rtquack
                </Link>

                {localStorage.getItem("accessToken") &&
                JSON.parse(localStorage.getItem("accessToken")).role ===
                  "instructor" ? (
                  <>
                    <li>
                      <Link to="/instructor/mycourse">My Course</Link>
                    </li>
                    <li>
                      <Link to="/instructor/submission">Submission</Link>
                    </li>

                    <li>
                      <UserDropdown />
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login/v2">Login</Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="p-2">
              {/* <SearchBar className='SearchBar' onSearch={handleSearch} /> */}
            </div>
          </div>
        </div>
      </NavbarWrapper>
    </>
  );
};

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 80px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px,
    rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;

  .navbar-brand {
    font-size: 30px;
    span {
      color: var(--clr-orange);
    }
  }
  .cart-btn {
    margin-right: 18px;
    font-size: 23px;
    position: relative;
    .item-count-badge {
      background-color: var(--clr-orange);
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 12px;
      font-weight: 700;
      display: block;
      width: 23px;
      height: 23px;
      color: var(--clr-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .sidebar-open-btn {
    transition: all 300ms ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }
  .SearchBar {
    width: 20%;
    height: 100px;
  }
`;

export default Navbar;
