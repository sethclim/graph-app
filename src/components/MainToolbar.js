import { useContext } from "react";
import "../css/maintoolbar.css";
import { PenOptions } from "../models/PenOptions";
import { InputContext } from "../providers/InputProvider";


const MainToolbar = () => {
  const { setPenSelection,setDots,setLinePoints, setRedraw,setPoints, color, setColor } = useContext(
    InputContext
  );

  function handleClear() {
    setPoints([]);
    setLinePoints([]);
    setDots([]);
    setRedraw(true);
  }

  const handleChangeComplete = (color, event) => {
    console.log("This is color " + color)
    setColor(color)
  };

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
      <div className="my-color-pickers">

      </div>
      
    </div>
  );
};

export default MainToolbar;
