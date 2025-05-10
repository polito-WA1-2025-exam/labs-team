// src/pages/CartPage/NavbarComponent.jsx
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <Navbar bg="primary" variant="dark" className="px-3">
      <Container fluid>
        <Navbar.Brand>Shopping Cart</Navbar.Brand>
        <Link to="/establishments" className="ms-auto">
          <Button variant="outline-light">
            <i className="bi bi-arrow-left"></i> Back
          </Button>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
