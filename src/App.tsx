import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ShipmentTable from './components/ShipmentTable';
import ViewingPage from './components/ViewingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/master" element={<ShipmentTable />} />
        <Route path="/viewing" element={<ViewingPage />} />
      </Routes>
    </Router>
  );
}

export default App;