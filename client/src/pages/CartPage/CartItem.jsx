// src/pages/CartPage/CartItem.jsx
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import FoodItemModal from './FoodItemModal';

function CartItem({ bag, onRemoveBag, onRemoveItem }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{bag.type} Bag</h5>
        <p><strong>Size:</strong> {bag.size}</p>
        <p><strong>Price:</strong> €{bag.price.toFixed(2)}</p>
        <p><strong>Pickup Time:</strong> {bag.pickupTimeRange}</p>
        <div className="d-flex justify-content-between">
          {bag.type === 'regular' &&
            <Button variant="info" onClick={() => setShowModal(true)}>View Contents</Button>
          }
          <Button variant="danger" onClick={() => onRemoveBag(bag.id)}>
            <i className="bi bi-trash"></i>
          </Button>
        </div>
        {bag.type === 'regular' &&
          <FoodItemModal
            show={showModal}
            onHide={() => setShowModal(false)}
            items={bag.content}
            onRemoveItem={itemId => onRemoveItem(bag.id, itemId)}
          />
        }
      </div>
    </div>
  );
}

export default CartItem;
