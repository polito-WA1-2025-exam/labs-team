// src/pages/BagsPage/BagList.jsx
import BagCard from './BagCard';
import { Row, Col } from 'react-bootstrap';

function BagList({ bags, onAddToCart }) {
  return (
    <Row className="row-cols-1 row-cols-md-2 g-4">
      {bags.map((bag) => (
        <Col key={bag.id}>
          <BagCard bag={bag} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Row>
  );
}

export default BagList;
