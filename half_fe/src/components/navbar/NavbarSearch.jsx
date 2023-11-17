import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AutoComplete, Input } from "antd";
import api from "../../config/axios";
import UserDropdown from "../UserPage/UserDropdown";
import Search from "antd/es/input/Search";

const NavbarSearch = () => {
  const [course, setCourse] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const account = JSON.parse(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (value) {
      fetchCourseByKey(value);
    } else {
      setOptions([]);
    }
    setSearchValue(value);
    console.log(value);
  };

  const fetchCourseByKey = (key) => {
    api.get(`/api/courses/${key}`).then((response) => {
      setCourse(response.data);
      setOptions(
        response.data.map((course) => ({
          value: course.name,
          key: course.courseID,
        }))
      );
      console.log(response.data);
    });
  };

  const onSelect = (value) => {
    const selectedCourse = course.find((c) => c.name === value);
    if (selectedCourse) {
      navigate(`/courses/${selectedCourse.courseID}`);
    }
  };

  const loadValue = () => {
    setSearchValue("");
  };

  return (
    <>
      <NavbarWrapper className="bg-white flex" direction="horizontal" gap={6}>
        <div className="container">
          <div className="brand-and-toggler flex flex-between w-100">
            <div className="p-2 row">
              <ul>
                <Link
                  to={`${account.learnerID ? `/user` : `/instructor`}`}
                  className="navbar-brand text-uppercase ls-1 fw-8"
                  onClick={loadValue}
                >
                  <span className="topic">A</span>rtquack
                </Link>

                <AutoComplete
                  // popupMatchSelectWidth={252}
                  style={{
                    height: "30px",
                  }}
                  options={options}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                  size="large"
                >
                  <Search
                    placeholder="Search course in ArtQuack"
                    allowClear
                    size="large"
                    enterButton
                    value={searchValue}
                    style={{
                      width: 500,
                      paddingLeft: 50,
                    }}
                  />
                  {/* <Input.Search size="large" placeholder="Search course in ArtQuack" allowClear enterButton /> */}
                </AutoComplete>

                {localStorage.getItem("accessToken") &&
                JSON.parse(localStorage.getItem("accessToken")).role ? (
                  <>
                    <li className="col-md-4 offset-md-4">
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
    padding-top: 10px;
    span {
      color: var(--clr-orange);
      padding-bottom: 10px;
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

export default NavbarSearch;
