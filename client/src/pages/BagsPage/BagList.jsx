// src/pages/BagsPage/BagList.jsx
import BagCard from './BagCard';
import { Row, Col } from 'react-bootstrap';

function BagList(props) {
  return (
    <Row className="row-cols-1 row-cols-md-2 g-4">
      {props.bags.map((bag) => (
        <Col key={bag.id}>
          <BagCard bag={bag} onAddToCart={props.onAddToCart} openModal={props.openModal} />
        </Col>
      ))}
    </Row>
  );
}

export default BagList;
