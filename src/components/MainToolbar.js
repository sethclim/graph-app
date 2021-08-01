import { useContext } from "react";
import "../css/maintoolbar.css";
import { InputContext } from "../providers/InputProvider";

const MainToolbar = () => {
  const { setPenSelection } = useContext(InputContext);

  return (
    <div id="main-toolbar">
      <button className="toolbtn" onClick={() => setPenSelection(true)}>
        Pen
      </button>
      <button className="toolbtn" onClick={() => setPenSelection(false)}>
        Dot
      </button>
      <button className="toolbtn">Eraser</button>
    </div>
  );
};

export default MainToolbar;
