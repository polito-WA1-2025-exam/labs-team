// src/components/Navbar.jsx
import { Navbar, Container } from 'react-bootstrap';

function AppNavbar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Surprise Bag App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
