import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Game from './pages/Game';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/game" component={Game} />
    </BrowserRouter>
  );
}

export default App;
