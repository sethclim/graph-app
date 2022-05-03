import { useContext, useState } from "react";
import { Range } from "../../domain/models/Range";
import { GraphContext } from "../../domain/providers/GraphProvider";
import { InputContext } from "../../domain/providers/InputProvider";
import { usePost } from "../../domain/hooks/usePost"
import { EndPoints } from "../../domain/constants/EndPoints";

import "../scss/graph-controls.scss";

const GraphControls = () => {
  const {setXRange, setYRange} = useContext(GraphContext);

  const {points,linePoints,dots} = useContext(InputContext);
  const {send, success } = usePost(EndPoints.insertGraph);

  const [xMin, setXMin] = useState(-5)
  const [xMax, setXMax] = useState(5)
  const [xStep, setXStep] = useState(1)

  const [yMin, setYMin] = useState(-5)
  const [yMax, setYMax] = useState(5)
  const [yStep, setYStep] = useState(1)

  const handleXMinChange = (num) =>{
    let number = parseInt(num)
    if(!isNaN(number) && checkMinMax(num, xMax))
    {
      setXMin(number)
      if(checkValid(number, xMax, xStep)){
        setXRange(new Range(number, xMax, xStep))
      }
    }
    else{
      setXMin("")
    }
  }
  const handleXMaxChange = (num) =>{
    console.log("recived " + num)
    let number = parseInt(num)
    if(!isNaN(number)&& checkMinMax(xMin, num))
    {
      console.log("I passed")
      setXMax(number)
      if(checkValid(xMin, number, xStep)){
        setXRange(new Range(xMin, number, xStep))
      }
    }
    else{
      setXMax("")
    }
  
  }
  const handleXStepChange = (num) =>{
    let number = parseInt(num)
    if(!isNaN(number)&& number >=0)
    {
      setXStep(number)
      if(checkValid(xMin, xMax, number)){
        setXRange(new Range(xMin, xMax, number))
      }
    }
    else{
      setXStep("")
    }
  
  }
  const handleYMinChange = (num) =>{
    let number = parseInt(num)
    if(!isNaN(number)&& checkMinMax(num, yMax))
    {
      setYMin(number)
      if(checkValid(number, yMax, yStep)){
        setYRange(new Range(number, yMax, yStep))
      }
    }
    else{
      setYMin("")
    }
  }
  const handleYMaxChange = (num) =>{
    let number = parseInt(num)
    if(!isNaN(number)&& checkMinMax(yMin, num))
    {
      setYMax(number)
      if(checkValid(yMin, number, yStep)){
        setYRange(new Range(yMin, number, yStep))
      }
    }
    else{
      setYMax("")
    }

  }
  const handleYStepChange = (num) =>{
    let number = parseInt(num)

    if(!isNaN(number) && number >=0)
    {
      setYStep(number)

      if(checkValid(yMin, yMax, number)){
        setYRange(new Range(yMin, yMax, number))
      }
    }
    else{
      setYStep("")
    }
  
  }

  const checkValid = (num1, num2, num3) =>{
    return(typeof num1 == 'number' && typeof num2 == 'number' && typeof num3 == 'number')
  }

  const checkMinMax = (min, max) =>{
    if(min >= max || max <= min){
      return false
    }
    return true
  }

  const handleSave = async () =>{
    const graphData = {
      "userid":"6269efee5c7946af1d37dc2c",
      lines : linePoints,
      dots : dots,
      points : points,
      XMin :  xMin,
      XMax : xMax,
      XStep : xStep,
      YMin : yMin,
      YMax : yMax,
      YStep : yStep
    }
    await send(graphData);
  }

  return (
    <div id="graph-controls">
  
        <h3>Set Scale</h3>    
        <label className="row-header">X Range</label>
        <div className="control-row">
          <input type="text" placeholder={xMin}  onChange={(event) => handleXMinChange(event.target.value) } />
          <p> - </p>
          <input type="text" placeholder={xMax}  onChange={(event) => handleXMaxChange(event.target.value)} />
          <label>Step</label>
          <input type="text" placeholder={xStep} onChange={(event) => handleXStepChange(event.target.value)} />
        </div>
        <label>Y Range</label>
        <div className="control-row">

            <input type="text" placeholder ={yMin}  onChange={(event) => handleYMinChange(event.target.value)} />
            <p> - </p>
            <input type="text" placeholder ={yMax}  onChange={(event) => handleYMaxChange(event.target.value)} />
            <label>Step</label>
            <input type="text" placeholder ={yStep} onChange={(event) => handleYStepChange(event.target.value)} />
        </div>

        <div className="control-row">
          <button onClick={()=> handleSave()}>Save</button>
        </div>
    </div>
  );
};

export default GraphControls;
