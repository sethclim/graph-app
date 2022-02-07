import "./css/base.css";
import "./css/toplevel.css";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainToolbar from "./components/MainToolbar";
import { InputProvider } from "./providers/InputProvider";
import { GraphProvider } from "./providers/GraphProvider";
import GraphControls from "./components/GraphControls";
import CogButton from "./components/CogButton";
import { useState } from "react";

function App() {


  const [controls, setControls] = useState(false);

  

  function test (){
    setControls(!controls);
     console.log("controls " + controls) 
  }

  return (
    <InputProvider>
      <div className="App" id="top-grid">
        <Header className="header" />
        <div className="content container">
          <GraphProvider>
            <MainToolbar />
            <Graph />
            <CogButton onClick={test}  />

            {
              controls?   <GraphControls /> : null
            }
          
          </GraphProvider>
        </div>
        <Footer className="footer" />
      </div>
    </InputProvider>
  );
}

export default App;
