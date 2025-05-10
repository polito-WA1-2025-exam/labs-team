// src/pages/EstablishmentPage/EstablishmentsPage.jsx
import { useEffect, useState } from 'react';
import EstablishmentCard from './EstablishmentCard';
import { Container, Row } from 'react-bootstrap';

function EstablishmentsPage() {
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API fetch
    const mockData = [
      { id: 1, name: 'Bakery Bliss', address: '123 Main St', category: 'Bakery', phone: '123-456-7890' },
      { id: 2, name: 'Fruit Fiesta', address: '456 Orchard Rd', category: 'Grocery', phone: '987-654-3210' }
    ];
    setEstablishments(mockData);
  }, []);

  return (
    <Container className="my-4">
      <h2>Available Establishments</h2>
      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        {establishments.map(est => (
          <EstablishmentCard key={est.id} establishment={est} />
        ))}
      </Row>
    </Container>
  );
}

export default EstablishmentsPage;
