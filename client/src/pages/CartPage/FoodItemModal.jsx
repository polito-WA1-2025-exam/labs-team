// src/pages/CartPage/FoodItemModal.jsx
import { Modal, Button } from 'react-bootstrap';

function FoodItemModal({ show, onHide, items, onRemoveItem }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Bag Contents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {items.map(item => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
              <span>
                <i className={`bi ${item.icon} me-2`}></i>
                {item.name}
              </span>
              <Button variant="danger" size="sm" onClick={() => onRemoveItem(item.id)}>
                <i className="bi bi-trash"></i>
              </Button>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default FoodItemModal;
