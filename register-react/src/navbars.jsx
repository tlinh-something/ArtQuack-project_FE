import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';
import { Link } from 'react-router-dom'
// import RegisterIns from './RegisterIns.jsx';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container className='nav'>
        <Navbar.Brand href="#home">ArtQuack</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Category" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#cate1">Acrylic</NavDropdown.Item>
              <NavDropdown.Item href="#cate2">Gouache</NavDropdown.Item>
              <NavDropdown.Item href="#cate3">Oil Painting</NavDropdown.Item>
              <NavDropdown.Item href="#cate4">Engraving</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Nav>
            <Nav.Link href="#instructor">Teach on ArtQuack</Nav.Link>
            <Nav.Link href='#' id='log'>Log in</Nav.Link>
            <Nav.Link href='#' id='log'>Sign up</Nav.Link>
          </Nav> */}

          <Nav>
            <Link to="/registerIns">Teach on ArtQuack</Link>
            <Link to='#' id='log'>Log in</Link>
            <Link to='/' id='log'>Sign up</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;