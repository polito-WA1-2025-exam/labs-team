import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

function AppNavbar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/establishments">
          Surprise Bag App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
