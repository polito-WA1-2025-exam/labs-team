// src/pages/BagsPage/NavbarComponent.jsx
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <Navbar bg="primary" variant="dark" className="px-3">
      <Container fluid>
        <Navbar.Brand>Available Bags</Navbar.Brand>
        <Link to="/cart" className="ms-auto">
          <Button variant="outline-light">
            <i className="bi bi-cart3 fs-5"></i>
          </Button>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
