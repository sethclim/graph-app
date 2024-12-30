import { useContext } from "react";
import { GraphContext } from "../../../domain/providers/GraphProvider";
import { InputContext } from "../../../domain/providers/InputProvider";
import { usePost } from "../../../domain/hooks/usePost"
import { EndPoints } from "../../../domain/constants/EndPoints";
import { AuthContext } from "../../../domain/providers/AuthProvider";
import { useGraphScaleUpdate } from "../../../domain/hooks/useGraphScaleUpdate";
import { jsPDF } from "jspdf";

import style from "./graphcontrols.module.scss";

const GraphControls = () => {

  const { user }                                  = useContext(AuthContext)
  const {setXRange, setYRange, xRange, yRange }   = useContext(GraphContext);
  const {points, linePoints, dots}                = useContext(InputContext);

  const {send } = usePost(EndPoints.insertGraph);

  const {handleMin : handleXMin, handleMax : handleXMax, handleStep : handleXStep} = useGraphScaleUpdate(setXRange);
  const {handleMin : handleYMin, handleMax : handleYMax, handleStep : handleYStep} = useGraphScaleUpdate(setYRange);

  const handleSave = async () =>{

    if(user == null || user.id == null)
      return

    const graphData = {
      "userid": user.id,
      lines : linePoints,
      dots : dots,
      points : points,
      XMin :  xRange.min,
      XMax : xRange.max,
      XStep : xRange.step,
      YMin : yRange.min,
      YMax : yRange.max,
      YStep : yRange.step
    }
    await send(JSON.stringify(graphData));
  }

  const handleDownload = () => {
    var bk_canvas = document.getElementById('graph_backgroundLayer__2hAx3') as HTMLCanvasElement;
    var canvas = document.getElementById('graph_drawLayer__11e4q') as HTMLCanvasElement; 

    if(canvas){
      var imgData = canvas.toDataURL("image/png", 1.0);
      var imgbkData = bk_canvas.toDataURL("image/png", 1.0);
      var pdf = new jsPDF();

      pdf.addImage(imgbkData, 'JPEG', 5, 5, 300, 300);
      pdf.addImage(imgData, 'JPEG', 5, 5, 300, 300);
      pdf.save("graph.pdf");
    }
    else{
      console.log("No canvas")
    }
  }

  return (
    <div id={style.graphControls}>
        <h3>Set Scale</h3>    
        <h4 className={style.rowHeader}>X Range</h4>
        <div className={style.controlRow}>
          <p>Min</p>
          <input type="text" defaultValue={xRange.min}  onChange={(event) => handleXMin(event.target.value) } />
          <p> - </p>
          <p>Max</p>
          <input type="text" defaultValue={xRange.max}  onChange={(event) => handleXMax(event.target.value)} />

        </div>
        <div className={style.controlRow}>
        <label>Step</label>
          <input type="text" defaultValue={xRange.step} onChange={(event) => handleXStep(event.target.value)} />
        </div>
        <h4 className={style.rowHeader}>Y Range</h4>
        <div className={style.controlRow}>
            <p>Min</p>
            <input type="text" defaultValue ={yRange.min}  onChange={(event) => handleYMin(event.target.value)} />
            <p> - </p>
            <p>Max</p>
            <input type="text" defaultValue ={yRange.max}  onChange={(event) => handleYMax(event.target.value)} />
        </div>
        <div className={style.controlRow}>
            <label>Step</label>
            <input type="text" defaultValue ={yRange.step} onChange={(event) => handleYStep(event.target.value)} />
        </div>
        <br></br>
        <h3>Save Graph</h3>
        <div className={style.controlRow}>
          <div className={style.center}>
               <button onClick={()=> handleSave()}>Save</button>
          </div>
        </div>
        <div className={style.controlRow}>
          <div className={style.center}>
            <button onClick={()=> handleDownload()}>Download</button>
          </div>
        </div>
    </div>
  );
};

export default GraphControls;
