import { useContext } from "react";
import { GraphContext } from "../../../domain/providers/GraphProvider";
import { InputContext } from "../../../domain/providers/InputProvider";
import { usePost } from "../../../domain/hooks/usePost"
import { EndPoints } from "../../../domain/constants/EndPoints";
import { AuthContext } from "../../../domain/providers/AuthProvider";
import { useGraphScaleUpdate } from "../../../domain/hooks/useGraphScaleUpdate";
import { jsPDF } from "jspdf";

import {graphControls,controlRow, center, rowHeader } from "./graph-controls.module.scss";


const GraphControls = () => {

  const { user }                                = useContext(AuthContext)
  const {setXRange, setYRange, xRange, yRange } = useContext(GraphContext);
  const {points,linePoints,dots}                = useContext(InputContext);

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
      XMin :  xRange.XMin,
      XMax : xRange.XMax,
      XStep : xRange.XStep,
      YMin : yRange.YMin,
      YMax : yRange.YMax,
      YStep : yRange.YStep
    }
    await send(graphData);
  }

  const handleDownload = () => {
    var bk_canvas = document.getElementById('graph_backgroundLayer__2hAx3');
    var canvas = document.getElementById('graph_drawLayer__11e4q');

    if(canvas){
      var imgData = canvas.toDataURL("image/png", 1.0);
      var imgbkData = bk_canvas.toDataURL("image/png", 1.0);
      var pdf = new jsPDF();

      pdf.addImage(imgbkData, 'JPEG', 5, 5);
      pdf.addImage(imgData, 'JPEG', 5, 5);
      pdf.save("graph.pdf");
    }
    else{
      console.log("No canvas")
    }
 
  }

  return (
    <div id={graphControls}>
        <h3>Set Scale</h3>    
        <h4 className={rowHeader}>X Range</h4>
        <div className={controlRow}>
          <p>Min</p>
          <input type="text" placeholder={xRange.XMin}  onChange={(event) => handleXMin(event.target.value) } />
          <p> - </p>
          <p>Max</p>
          <input type="text" placeholder={xRange.XMax}  onChange={(event) => handleXMax(event.target.value)} />

        </div>
        <div className={controlRow}>
        <label>Step</label>
          <input type="text" placeholder={xRange.XStep} onChange={(event) => handleXStep(event.target.value)} />
        </div>
        <h4 className={rowHeader}>Y Range</h4>
        <div className={controlRow}>
            <p>Min</p>
            <input type="text" placeholder ={yRange.YMin}  onChange={(event) => handleYMin(event.target.value)} />
            <p> - </p>
            <p>Max</p>
            <input type="text" placeholder ={yRange.YMax}  onChange={(event) => handleYMax(event.target.value)} />
        </div>
        <div className={controlRow}>
            <label>Step</label>
            <input type="text" placeholder ={yRange.YStep} onChange={(event) => handleYStep(event.target.value)} />
        </div>
        <br></br>
        <h3>Save Graph</h3>
        <div className={controlRow}>
          <div className={center}>
               <button onClick={()=> handleSave()}>Save</button>
          </div>
        </div>
        <div className={controlRow}>
          <div className={center}>
            <button onClick={()=> handleDownload()}>Download</button>
          </div>
        </div>
    </div>
  );
};

export default GraphControls;
