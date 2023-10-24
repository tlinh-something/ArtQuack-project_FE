//import React from 'react';
import styled from "styled-components";
import {MdMenu, MdShoppingCart} from "react-icons/md";
import {Link} from 'react-router-dom';
import { useSidebarContext } from './context/sidebar_context';
import { useCartContext } from './context/cart_context';
import UserDropdown from './UserPage/UserDropdown';
// import SearchBar from './SearchBar';
import '../components/Test.css';
import Nav from 'react-bootstrap/Nav';

import { useUser } from "./context/user_context";

const Navbar = () => {
  const {total_items} = useCartContext();
  const {openSidebar} = useSidebarContext();
  // const { user } = useUser();
  // useEffect(() => {
  //   // Kiểm tra xem đã có thông tin người dùng hay chưa
  //   if (!user) {
  //     // Không có thông tin người dùng, thực hiện redirect hoặc xử lý khác
  //     // Ví dụ: Redirect đến trang đăng nhập
  //     window.location.href = "/login";
  //   }
  // }, [user]);
  return (
    <NavbarWrapper className = "bg-white flex">
      <div className='container'>
        <div className='brand-and-toggler flex '>
          <Link to = "/" className='navbar-brand text-uppercase ls-1 fw-8'>
            <span className="topic">A</span>rtquack 
         
          </Link>
          {/* <SearchBar className='SearchBar' onSearch={handleSearch} /> */}
            {/* <div className='Login-section'>
            <button type="button" className='Login-btn'>Login</button> 
            <button type="button" className='Login-btn'>Sign-up</button> 
            </div> */}
            <Nav id="Login-section" className='lg-4'>
              <Link to="/registerIns" id="log">Teach on ArtQuack</Link>
              <Link to='/login' id='log'>Log in</Link>
              <Link to='/register' id='log'>Sign up</Link>   
          </Nav>
          <div className="user-cart flex">

         
          <div className='navbar-btns flex'>
            <Link to = "/cart" className='cart-btn'>
              <MdShoppingCart />
              <span className='item-count-badge'>{total_items}</span>
            </Link>
            <button type = "button" className='sidebar-open-btn' onClick={() => openSidebar()}>
              <MdMenu />
            </button>
          </div>
          {/* <div className="user-info">
           {
           isAuthenticated?(<UserDropdown/>):(<div></div>)
           }
          </div>
          */}
          </div>
        </div>
      </div>
    </NavbarWrapper>
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
  .user-cart{
    gap: 20px;
    position: absolute;
  right:15%;
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

`;

export default Navbar;