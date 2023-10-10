import React, { useState } from 'react';
import './UserDropdown.css'; // Import your CSS file for styling

function UserDropdown() {
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
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xQLBRU3YYpXVzydiD4jR8aXnsowpU2I16HDrn4VYSw&s" alt="User" />
      {isDropdownOpen && (
        <div className="dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <ul>
            <li>My Profile</li>
            <li>My Learning</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
