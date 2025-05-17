// src/pages/BagsPage/BagsPage.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BagList from './BagList';
import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import BagModalReadOnly from './BagModalReadOnly';

function BagsPage(props) {
  const { id } = useParams();  // Get the establishment ID from the URL
  const establishmentId = parseInt(id, 10);

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
  
   // Filter bags for the specific establishment
  const filteredBags = bags.filter(bag => bag.establishmentId === establishmentId);

  return (
    <>
      <NavbarComponent establishmentId={establishmentId}/>
      <Container className="my-4">
        <h2 className="mb-4">Bags for Establishment #{establishmentId}</h2>
        <BagList bags={filteredBags} onAddToCart={props.addToCart} openModal={openModal}/>
        <BagModalReadOnly show={showModal} onHide={() => setShowModal(false)} bag={selectedBag} />
      </Container>
    </>
  );
}

export default BagsPage;
