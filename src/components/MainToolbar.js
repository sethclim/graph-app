import { useContext } from "react";
import "../css/maintoolbar.css";
import { PenOptions } from "../models/PenOptions";
import { InputContext } from "../providers/InputProvider";

const MainToolbar = () => {
  const { setPenSelection,setDots,setLinePoints, setRedraw,setPoints } = useContext(
    InputContext
  );

  function handleClear() {
    setPoints([]);
    setLinePoints([]);
    setDots([]);
    setRedraw(true);
  }

  return (
    <div id="main-toolbar">
      <button className="toolbtn" onClick={() => setPenSelection(PenOptions.pen)}>
        Pen
      </button>
      <button className="toolbtn" onClick={() => setPenSelection(PenOptions.line)}>
        Line
      </button>
      <button className="toolbtn" onClick={() => setPenSelection(PenOptions.dot)}>
        Dot
      </button>
      <button className="toolbtn">Eraser</button>
      <button className="toolbtn" onClick={() => handleClear()}>
        Clear
      </button>
    </div>
  );
};

export default MainToolbar;
