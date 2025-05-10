// src/pages/BagsPage/BagsPage.jsx
import { useState } from 'react';
import BagList from './BagList';
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';

function BagsPage() {
  // Temporary mock data
  const [bags] = useState([
    {
      id: 1,
      type: 'Surprise',
      size: 'Medium',
      price: 4.5,
      pickupTimeRange: '18:00 - 19:00',
      state: 'available',
      content: [],
    },
    {
      id: 2,
      type: 'Regular',
      size: 'Large',
      price: 6.0,
      pickupTimeRange: '19:30 - 20:30',
      state: 'reserved',
      content: [
        { name: 'Juice', icon: 'bi-cup-straw' },
        { name: 'Eggs', icon: 'bi-egg' },
        { name: 'Bread', icon: 'bi-basket' },
      ],
    },
  ]);

  const handleAddToCart = (bag) => {
    console.log('Added to cart:', bag);
    // Hook this into global state or context later
  };

  return (
    <>
    <NavbarComponent />
    <Container className="my-4">
      <h2 className="mb-4">Available Bags</h2>
      <BagList bags={bags} onAddToCart={handleAddToCart} />
    </Container>
    </>
  );
}

export default BagsPage;
