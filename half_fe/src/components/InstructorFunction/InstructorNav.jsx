// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// function InstructorNav() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const openDropdown = () => {
//     setIsDropdownOpen(true);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   const [setLogin] = useState(true);

//   function handleLogout() {
//     setLogin({ setLogin: false });
//   }


//   return (
//     <div
//       className="instructor"
//       onMouseEnter={openDropdown}
//       onMouseLeave={closeDropdown}
//     >
//       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xQLBRU3YYpXVzydiD4jR8aXnsowpU2I16HDrn4VYSw&s" style={{height: "30px", width: "30px"}} alt="User" />
//       {isDropdownOpen && (
//         <div className="dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
//           <ul>
//             <Link to='#'>My Profile</Link>
//             <Link to='#'>My Learning</Link>
//             <Link to='/mycourse'>My Course</Link>
//             <Link onClick={handleLogout}>Logout</Link>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InstructorNav