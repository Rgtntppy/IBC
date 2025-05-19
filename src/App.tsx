import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/topPage/Login';
import ShipmentTable from './components/master/ShipmentTable';
import ViewingPage from './components/viewing/ViewingPage';

const basename = process.env.NODE_ENV === 'production' ? '/IBC/docs' : '/';

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/master" element={<ShipmentTable />} />
        <Route path="/viewing" element={<ViewingPage />} />
      </Routes>
    </Router>
  );
}

export default App;