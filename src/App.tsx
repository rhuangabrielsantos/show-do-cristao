import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalContextProvider from "./context";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Infos from "./pages/Infos";
import Notice from "./pages/Notice";
import Ranking from "./pages/Ranking";
import Winner from "./pages/Winner";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/notice" component={Notice} />
        <Route path="/game" component={Game} />
        <Route path="/winner" component={Winner} />
        <Route path="/infos" component={Infos} />
        <Route path="/ranking" component={Ranking} />
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GlobalContextProvider>
  );
}

export default App;
