import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/topPage/Home';
import ShipmentTable from './components/master/ShipmentTable';
import ViewingPage from './components/viewing/ViewingPage';

const basename = process.env.NODE_ENV === 'production' ? '/IBC/docs' : '/';

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/master" element={<ShipmentTable />} />
        <Route path="/viewing" element={<ViewingPage />} />
      </Routes>
    </Router>
  );
}

export default App;