import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/EstablishmentsPage/Navbar';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import EstablishmentsPage from './pages/EstablishmentsPage/EstablishmentsPage';
import BagsPage from './pages/BagsPage/BagsPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


function App() {
  const [cart, setCart] = useState([]);

 const addToCart = (bag) => {
  // Constraint 1: Only one bag per establishment per date
  const alreadyExists = cart.some(
    (b) => b.establishmentId === bag.establishmentId && b.date === bag.date
  );

  if (alreadyExists) {
    alert("You can only add one bag per establishment per day.");
    return;
  }

  // Constraint 2: Pickup time must be in the future
  const today = dayjs().format('YYYY-MM-DD');
  const now = dayjs();

  if (bag.date === today) {
    const pickupEndStr = bag.pickupTimeRange.split(' - ')[1]; // e.g. "19:30"
    const pickupEnd = dayjs(`${bag.date}T${pickupEndStr}`);

    if (now.isAfter(pickupEnd)) {
      alert("This bag's pickup time has already passed.");
      return;
    }
  }

  // Add to cart
  setCart((prev) => [...prev, bag]);
  };


  const removeFromCart = (bagId) => {
    setCart(prev => prev.filter(b => b.id !== bagId));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/establishments" element={<EstablishmentsPage />} />
        <Route path="/establishments/:id/bags" element={<BagsPage addToCart={addToCart} />}/>
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} removeBag={removeFromCart}/>} />
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}
      </Routes>
    </>
    
  );
}

export default App;


