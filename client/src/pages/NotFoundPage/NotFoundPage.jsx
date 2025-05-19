// src/pages/NotFoundPage/NotFoundPage.jsx
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5">
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <Button variant="primary" onClick={() => navigate('/establishments')}>
        Go Back to Establishments
      </Button>
    </Container>
  );
}

export default NotFoundPage;
