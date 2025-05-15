// components/BagModalReadOnly.jsx
import { Modal, ListGroup } from 'react-bootstrap';

function BagModalReadOnly({ show, onHide, bag }) {
  if (!bag) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{bag.type} Bag Contents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bag.content.length > 0 ? (
          <ListGroup>
            {bag.content.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <i className={`bi ${item.icon} me-2`}></i>
                {item.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">This bag's contents are a surprise!</p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default BagModalReadOnly;
