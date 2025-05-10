// src/pages/EstablishmentsPage/EstablishmentCard.jsx
import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EstablishmentCard({ establishment }) {
  const navigate = useNavigate();

  return (
    <Col>
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <Card.Title>{establishment.name}</Card.Title>
          <Card.Text>
            <strong>Address:</strong> {establishment.address}<br />
            <strong>Category:</strong> {establishment.category}<br />
            <strong>Phone:</strong> {establishment.phone}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="primary" onClick={() => navigate(`/establishments/${establishment.id}/bags`)}>
            View Bags
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default EstablishmentCard;
