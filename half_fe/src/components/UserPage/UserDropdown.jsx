import { useState } from 'react';
import './UserDropdown.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import './UserDropdown.css'
function UserDropdown() {

  const userName = JSON.parse(localStorage.getItem("accessToken")).name;
  

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
      <div
        className="learner-name"
        style={{
          width: 180,
          paddingTop: 7,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 50,
          textAlign: "center",
          borderColor: "grey",
          marginLeft:10,
          marginRight:10,
          marginBottom:15
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
