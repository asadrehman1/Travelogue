import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import image1 from '../../../assets/treelogo.png'


function Header() {
  const { isAuthenticated } = useSelector(state => state.user);
  return (

    <Navbar expand="lg" className="bg-color">

      <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center' }}>
        <img className="logo-image animated-logo" src={image1} alt='logo-img' width="20%" style={{ transform: 'rotate(-15deg)', marginLeft: '10px' }} />
        <h2 className="logo-text text-white animated-logo" ><b>Travelogue</b></h2>
      </Link>

      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link text-white">Home</Link>
            <Link to="/products" className="nav-link text-white">Packages</Link>
            <Link to="/vehicles" className="nav-link text-white">Vehicles</Link>
            <Link to="/search" className="nav-link text-white">Search</Link>
            <Link to="/blogs" className="nav-link text-white">Blogs</Link>
            <Link to="/contact" className="nav-link text-white">Contact</Link>
            {!isAuthenticated && <Link to="/login" className="nav-link text-white">Login</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Header;