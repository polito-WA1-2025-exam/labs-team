// src/pages/CartPage/CartItem.jsx
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function CartItem({ bag, onRemoveBag, onRemoveItem, openModal }) {

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{bag.type} Bag</h5>
        <p><strong>Size:</strong> {bag.size}</p>
        <p><strong>Price:</strong> €{bag.price.toFixed(2)}</p>
        <p><strong>Pickup Time:</strong> {bag.pickupTimeRange}</p>

        <div className="d-flex justify-content-between align-items-center gap-2 mt-3">
          <Button variant="danger" onClick={() => onRemoveBag(bag.id)}>
            <i className="bi bi-trash"></i>
          </Button>

          {bag.type?.toLowerCase() === 'regular' && (
            <Button variant="info" size="sm" onClick={() => openModal(bag)}>
              Edit Contents
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
