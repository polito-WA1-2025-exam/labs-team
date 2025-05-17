// src/pages/BagsPage/NavbarComponent.jsx
import { Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarComponent({ establishmentId }) {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart', { state: { establishmentId } });
  };

  return (
    <Navbar bg="primary" variant="dark" className="px-3">
      <Container fluid>
        <Navbar.Brand>Available Bags</Navbar.Brand>
        <Button variant="outline-light" className="ms-auto" onClick={goToCart}>
          <i className="bi bi-cart3 fs-5"></i>
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;


