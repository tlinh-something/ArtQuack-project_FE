import { useState } from "react";
import "./UserDropdown.css";
import { Button } from "antd";
function UserDropdown() {
  const userName = JSON.parse(localStorage.getItem("accessToken"))?.name;
  // const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wallet = JSON.parse(localStorage.getItem("accessToken")).wallet;
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
      <div
        className="learner-name"
        style={{
          border: "1px solid #000",
          padding: "0 10px",
          width: "150px",
          borderRadius: "30px",
        }}
      >
        {userName}
      </div>
      {isDropdownOpen && (
        <div
          className="dropdown"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div style={{ fontSize: "18px" }} className="mb-2">
            My Profile
          </div>
          <div style={{ fontSize: "18px" }} className="mb-2">
            Wallet:{" "}
            <span style={{ color: "orange", fontWeight: "600" }}>
              {wallet.balance}
            </span>
          </div>
          <div>My Profile</div>
          {/* <div>
            Wallet: <span style={{ color: "orange" }}>{wallet.balance}</span>
          </div> */}
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
