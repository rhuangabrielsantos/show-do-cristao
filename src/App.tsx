import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import GlobalContextProvider from './context';
import Game from './pages/Game';
import Home from './pages/Home';
import Notice from './pages/Notice';

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/notice" component={Notice} />
        <Route path="/game" component={Game} />
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
