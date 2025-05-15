// src/pages/CartPage/CartPage.jsx
import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import CartItem from './CartItem';
import { Container, Form, Button } from 'react-bootstrap';
import BagModalEditable from './BagModalEditable';


function CartPage(props) {
  const [allergies, setAllergies] = useState('');

  const removeItem = (bagId, itemId) => {
    props.setCart(prev => prev.map(b =>
      b.id === bagId
        ? { ...b, content: b.content.filter(i => i.id !== itemId) }
        : b
    ));
  };

  const confirmCart = () => {
    console.log('Cart confirmed', props.cart, allergies);
    alert('Cart confirmed!');
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedBag, setSelectedBag] = useState(null);

  // Function to update a bag's content and track removed items
  const updateBagContent = (bagId, newContent, removedItems) => {
  props.setCart(prev =>
    prev.map(bag =>
      bag.id === bagId
        ? { ...bag, content: newContent, _removedItems: removedItems }
        : bag
    )
  );
 };

  const openModal = (bag) => {
    setSelectedBag(bag);
    setShowModal(true);
  };

  return (
    <>
      <NavbarComponent />
      <Container className="my-4">
        <h2>Your Cart</h2>
        {props.cart.map(bag => (
          <CartItem
            key={bag.id}
            bag={bag}
            onRemoveBag={props.removeBag}
            onRemoveItem={removeItem}
            openModal={openModal}
          />
        ))}
        
        <BagModalEditable show={showModal} onHide={() => setShowModal(false)} bag={selectedBag} onContentUpdate={updateBagContent}/>
        
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
