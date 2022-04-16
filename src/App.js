import "./scss/base.scss";
import "./scss/toplevel.scss";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainToolbar from "./components/MainToolbar";
import GraphControls from "./components/GraphControls";
import CogButton from "./components/CogButton";
import { useState } from "react";
import Providers from "./providers/index"

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from "./pages/Signn";

function App() {


  return (
      <Providers>

        <BrowserRouter>
          <Switch>
            <Route path={'/'} component={SignIn} exact/>
            <Route path={'/home'} component={Home} exact/>
          </Switch>
        </BrowserRouter>

  
      </Providers>
  );
}

export default App;
