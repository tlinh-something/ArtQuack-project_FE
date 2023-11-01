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
      <div className='learner-name'>{userName}</div>
      {isDropdownOpen && (
        <div className="dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          
            <div>My Profile</div>
            <div>My Learning</div>
            <div>
                    <Link to='/logout'>Logout</Link>
                  </div>
          
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
