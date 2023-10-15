
import styled from "styled-components";
// import {MdMenu} from "react-icons/md";
// import {Link} from 'react-router-dom';
// import { useSidebarContext } from '../context/sidebar_context';
//import { useCartContext } from './context/cart_context';
import SearchBar from '../SearchBar';
//import '../components/Test.css';
import '../Test.css';
// import Nav from 'react-bootstrap/Nav';
//import { Stack } from "react-bootstrap";


const Navbar = () => {
  //const {total_items} = useCartContext();
  // const {openSidebar} = useSidebarContext();
  const handleSearch = (query) => {
    // Replace this with your actual search logic
    alert(`Searching for: ${query}`);
  };
  return (
    <div className="container w-100">
      <div className="header">
        <NavbarWrapper className="flex w-100" gap={4}>
          <nav className="navbar navbar-expand-sm bg-light">

            <a className="navbar-brand fw-8 text-uppercase" href="/">
              <span className="navbar-brand">A</span>rtQuack
            </a>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded='false' aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <SearchBar className='SearchBar' onSearch={handleSearch} />
            <div className="collapse navbar-collapse flex" >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link">Teach on ArtQuack</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">LogIn</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">SignUp</a>
                </li>
              </ul>
            </div>
{/*             
            <a className="navbar-brand" href="#">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xQLBRU3YYpXVzydiD4jR8aXnsowpU2I16HDrn4VYSw&s"/>
            </a> */}
            
          </nav>

        </NavbarWrapper>
      </div>
    </div>
    
  )
}

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 80px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px, rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;

  .navbar-brand{
    font-size: 30px;
    span{
      color: var(--clr-orange);
    }
  }
  .cart-btn{
    margin-right: 18px;
    font-size: 23px;
    position: relative;
    .item-count-badge{
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

  .sidebar-open-btn{
    transition: all 300ms ease-in-out;
    &:hover{
      opacity: 0.7;
    }
  }
  .SearchBar{
    width: 20%;
    height: 100px;
  }
  media screen and (max-width: 768px){
    .SearchBar{
      display: none;
    }
  }
`;

export default Navbar;