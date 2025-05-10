// src/pages/BagsPage/BagCard.jsx
import { Button, Card, Badge } from 'react-bootstrap';

function BagCard({ bag, onAddToCart }) {
  const isAvailable = bag.state === 'available';

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{bag.type} Bag</Card.Title>
        <p><strong>Size:</strong> {bag.size}</p>
        <p><strong>Price:</strong> €{bag.price.toFixed(2)}</p>
        <p><strong>Pickup Time:</strong> {bag.pickupTimeRange}</p>

        {bag.type.toLowerCase() === 'regular' && bag.content?.length > 0 && (
          <>
            <p><strong>Contents:</strong></p>
            <div className="d-flex flex-wrap gap-2">
              {bag.content.map((item, index) => (
                <i className={`bi ${item.icon} fs-3`} title={item.name} key={index}></i>
              ))}
            </div>
          </>
        )}

        <p className="mt-3">
          <strong>Status:</strong>{' '}
          <Badge bg={isAvailable ? 'success' : 'danger'}>
            {bag.state.charAt(0).toUpperCase() + bag.state.slice(1)}
          </Badge>
        </p>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button
          variant={isAvailable ? 'success' : 'secondary'}
          disabled={!isAvailable}
          onClick={() => onAddToCart(bag)}
        >
          {isAvailable ? 'Add to Cart' : 'Reserved'}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default BagCard;
