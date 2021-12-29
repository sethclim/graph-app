import "./css/base.css";
import "./css/toplevel.css";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainToolbar from "./components/MainToolbar";
import { InputProvider } from "./providers/InputProvider";
import { GraphProvider } from "./providers/GraphProvider";
import GraphControls from "./components/GraphControls";

function App() {
  return (
    <InputProvider>
      <div className="App" id="top-grid">
        <Header className="header" />
        <div className="content container">
          <GraphProvider>
            <MainToolbar />
            <Graph />
            <GraphControls />
          </GraphProvider>
        </div>
        <Footer className="footer" />
      </div>
    </InputProvider>
  );
}

export default App;
