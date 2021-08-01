import { useContext } from "react";
import "../css/maintoolbar.css";
import { InputContext } from "../providers/InputProvider";

const MainToolbar = () => {
  const { setPenSelection, setPoints, setDots, setRedraw } = useContext(
    InputContext
  );

  function handlelear() {
    // const newPoints = [...points];
    // newPoints.length = 0;
    setPoints([{ x: null, y: null }]);

    // const newDots = [...dots];
    // newDots.length = 0;

    setDots([{ x: null, y: null }]);
    setRedraw(true);
  }

  return (
    <div id="main-toolbar">
      <button className="toolbtn" onClick={() => setPenSelection(true)}>
        Pen
      </button>
      <button className="toolbtn" onClick={() => setPenSelection(false)}>
        Dot
      </button>
      <button className="toolbtn">Eraser</button>
      <button className="toolbtn" onClick={() => handlelear()}>
        Clear
      </button>
    </div>
  );
};

export default MainToolbar;
