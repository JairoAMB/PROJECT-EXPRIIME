import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Player from './components/player/Player';
import Questions from './components/questions/Questions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Player />} /> {}
        <Route path="/questions" element={<Questions />} /> {}
      </Routes>
    </Router>
  );
};

export default App;
