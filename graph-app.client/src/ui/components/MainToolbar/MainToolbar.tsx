import { useContext } from "react";
import { PenOptions } from "../../../domain/models/PenOptions";
import { InputContext } from "../../../domain/providers/InputProvider";

import styles from "./maintoolbar.module.scss";

const MainToolbar = () => {
  const { setPenSelection, setDots, setLinePoints, setRedraw, setPoints } = useContext(
    InputContext
  );

  function handleClear() {
    setPoints([]);
    setLinePoints([]);
    setDots([]);
    setRedraw(true);
  }

  // const handleChangeComplete = (color, event) => {
  //   console.log("This is color " + color)
  //   setColor(color)
  // };

  return (
    <div id={styles.mainToolbar}>
      <div className={styles.toolbarBtnWrap} >
        <button className={styles.toolBtn} onClick={() => setPenSelection(PenOptions.pen)}>
          Pen
        </button>
        <button className={styles.toolBtn} onClick={() => setPenSelection(PenOptions.line)}>
          Line
        </button>
        <button className={styles.toolBtn} onClick={() => setPenSelection(PenOptions.dot)}>
          Dot
        </button>
        {/* <button className="toolbtn">Eraser</button> */}
        <button className={styles.toolBtn} onClick={() => handleClear()}>
          Clear
        </button>
        <div className="my-color-pickers">

        </div>
      </div>
    </div>
  );
};

export default MainToolbar;
