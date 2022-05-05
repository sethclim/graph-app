import { useContext } from "react";
import { GraphContext } from "../../domain/providers/GraphProvider";
import { InputContext } from "../../domain/providers/InputProvider";
import { usePost } from "../../domain/hooks/usePost"
import { EndPoints } from "../../domain/constants/EndPoints";
import { AuthContext } from "../../domain/providers/AuthProvider";
import { useGraphScaleUpdate } from "../../domain/hooks/useGraphScaleUpdate";

import "../scss/graph-controls.scss";

const GraphControls = () => {

  const { user }                                = useContext(AuthContext)
  const {setXRange, setYRange, xRange, yRange,} = useContext(GraphContext);
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

  return (
    <div id="graph-controls">
        <h3>Set Scale</h3>    
        <label className="row-header">X Range</label>
        <div className="control-row">
          <input type="text" placeholder={xRange.XMin}  onChange={(event) => handleXMin(event.target.value) } />
          <p> - </p>
          <input type="text" placeholder={xRange.XMax}  onChange={(event) => handleXMax(event.target.value)} />
          <label>Step</label>
          <input type="text" placeholder={xRange.XStep} onChange={(event) => handleXStep(event.target.value)} />
        </div>
        <label>Y Range</label>
        <div className="control-row">
            <input type="text" placeholder ={yRange.YMin}  onChange={(event) => handleYMin(event.target.value)} />
            <p> - </p>
            <input type="text" placeholder ={yRange.YMax}  onChange={(event) => handleYMax(event.target.value)} />
            <label>Step</label>
            <input type="text" placeholder ={yRange.YStep} onChange={(event) => handleYStep(event.target.value)} />
        </div>
        <div className="control-row">
          <button onClick={()=> handleSave()}>Save</button>
        </div>
    </div>
  );
};

export default GraphControls;
