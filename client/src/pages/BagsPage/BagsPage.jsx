// src/pages/BagsPage/BagsPage.jsx
import { useState } from 'react';
import BagList from './BagList';
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import BagModalReadOnly from './BagModalReadOnly';

function BagsPage(props) {
  const [bags] = useState([
    {
      id: 1,
      type: 'Surprise',
      size: 'Medium',
      price: 4.5,
      establishmentId: 1,
      date: '2025-17-05',
      pickupTimeRange: '18:00 - 19:00',
      state: 'available',
      content: [],
    },
    {
      id: 2,
      type: 'Regular',
      size: 'Large',
      price: 6.0,
      establishmentId: 1,
      date: '2025-17-05',
      pickupTimeRange: '19:30 - 20:30',
      state: 'reserved',
      content: [
        { name: 'Juice', icon: 'bi-cup-straw' },
        { name: 'Eggs', icon: 'bi-egg' },
        { name: 'Bread', icon: 'bi-basket' },
      ],
    },
    {
      id: 3,
      type: 'Regular',
      size: 'Large',
      price: 6.0,
      establishmentId: 2,
      date: '2025-16-05',
      pickupTimeRange: '18:00 - 19:00',
      state: 'available',
      content: [
        { name: 'Juice', icon: 'bi-cup-straw' },
        { name: 'Eggs', icon: 'bi-egg' },
        { name: 'Bread', icon: 'bi-basket' },
      ],
    }
   ]);

   const [showModal, setShowModal] = useState(false);
   const [selectedBag, setSelectedBag] = useState(null);

   const openModal = (bag) => {
          setSelectedBag(bag);
          setShowModal(true);
   };
  
 
  return (
    <>
      <NavbarComponent />
      <Container className="my-4">
        <h2 className="mb-4">Available Bags</h2>
        <BagList bags={bags} onAddToCart={props.addToCart} openModal={openModal}/>
        <BagModalReadOnly show={showModal} onHide={() => setShowModal(false)} bag={selectedBag} />
      </Container>
    </>
  );
}

export default BagsPage;
