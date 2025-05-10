import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/EstablishmentsPage/Navbar';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import EstablishmentsPage from './pages/EstablishmentsPage/EstablishmentsPage';
import BagsPage from './pages/BagsPage/BagsPage';
import CartPage from './pages/CartPage/CartPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EstablishmentsPage />} />
        <Route path="/establishments/:id/bags" element={<BagsPage />}/>
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;


