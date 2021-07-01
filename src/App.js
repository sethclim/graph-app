import "./css/base.css";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainToolbar from "./components/MainToolbar";

function App() {
  return (
    <div className="App" id="top-grid">
      <Header className="header" />
      <div className="content container">
        <MainToolbar />
        <Graph className="graph" />
      </div>

      <Footer className="footer" />
    </div>
  );
}

export default App;
