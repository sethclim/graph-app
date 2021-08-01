import "./css/base.css";
import "./css/toplevel.css";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainToolbar from "./components/MainToolbar";
import { InputProvider } from "./providers/InputProvider";

function App() {
  return (
    <InputProvider>
      <div className="App" id="top-grid">
        <Header className="header" />
        <div className="content container">
          <MainToolbar />
          <Graph />
        </div>

        <Footer className="footer" />
      </div>
    </InputProvider>
  );
}

export default App;
