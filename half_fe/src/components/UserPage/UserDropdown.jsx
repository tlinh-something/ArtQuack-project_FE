import { useState } from "react";
import "./UserDropdown.css"; // Import your CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import "./UserDropdown.css";
import { Button } from "antd";
function UserDropdown() {
  const userName = JSON.parse(localStorage.getItem("accessToken"))?.name;
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="user"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <div className="learner-name">{userName}</div>
      {isDropdownOpen && (
        <div
          className="dropdown"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div>My Profile</div>

          <div>
            <Button
              onClick={() => {
                localStorage.clear();
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
