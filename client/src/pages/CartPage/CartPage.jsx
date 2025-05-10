// src/pages/CartPage/CartPage.jsx
import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import CartItem from './CartItem';
import { Container, Form, Button } from 'react-bootstrap';

function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      type: 'regular',
      size: 'Large',
      price: 6.00,
      pickupTimeRange: '18:00 - 19:00',
      content: [
        { id: 101, name: 'Juice', icon: 'bi-cup-straw' },
        { id: 102, name: 'Bread', icon: 'bi-basket' }
      ]
    },
    {
      id: 2,
      type: 'surprise',
      size: 'Medium',
      price: 4.50,
      pickupTimeRange: '19:00 - 20:00',
      content: []
    }
  ]);

  const [allergies, setAllergies] = useState('');

  const removeBag = (bagId) => {
    setCart(cart.filter(b => b.id !== bagId));
  };

  const removeItem = (bagId, itemId) => {
    setCart(cart.map(b =>
      b.id === bagId
        ? { ...b, content: b.content.filter(i => i.id !== itemId) }
        : b
    ));
  };

  const confirmCart = () => {
    console.log('Cart confirmed', cart, allergies);
    alert('Cart confirmed!');
  };

  return (
    <>
      <NavbarComponent />
      <Container className="my-4">
        <h2>Your Cart</h2>
        {cart.map(bag => (
          <CartItem
            key={bag.id}
            bag={bag}
            onRemoveBag={removeBag}
            onRemoveItem={removeItem}
          />
        ))}

        <Form.Group className="my-4">
          <Form.Label>Allergies (if any)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-3">
          <Button variant="success" onClick={confirmCart}>Confirm Cart</Button>
          <Button variant="secondary" href="/establishments/1/bags">Back to Bags</Button>
        </div>
      </Container>
    </>
  );
}

export default CartPage;
