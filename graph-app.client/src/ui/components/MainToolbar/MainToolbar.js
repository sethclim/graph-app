import { useContext } from "react";
import { PenOptions } from "../../../domain/models/PenOptions";
import { InputContext } from "../../../domain/providers/InputProvider";

import { mainToolbar, toolbarBtnWrap, toolBtn } from "./maintoolbar.module.scss";

const MainToolbar = () => {
  const { setPenSelection, setDots, setLinePoints, setRedraw, setPoints, color, setColor } = useContext(
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
    <div id={mainToolbar}>
      <div className={toolbarBtnWrap} >
        <button className={toolBtn} onClick={() => setPenSelection(PenOptions.pen)}>
          Pen
        </button>
        <button className={toolBtn} onClick={() => setPenSelection(PenOptions.line)}>
          Line
        </button>
        <button className={toolBtn} onClick={() => setPenSelection(PenOptions.dot)}>
          Dot
        </button>
        {/* <button className="toolbtn">Eraser</button> */}
        <button className={toolBtn} onClick={() => handleClear()}>
          Clear
        </button>
        <div className="my-color-pickers">

        </div>
      </div>
    </div>
  );
};

export default MainToolbar;
