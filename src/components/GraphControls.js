import { useContext, useState } from "react";
import "../css/graph-controls.css";
import { Range } from "../models/Range";
import { GraphContext } from "../providers/GraphProvider";

const GraphControls = () => {
  const {setXRange, setYRange} = useContext(GraphContext);

  const [xMin, setXMin] = useState(-5)
  const [xMax, setXMax] = useState(-5)
  const [xStep, setXStep] = useState(1)

  const [yMin, setYMin] = useState(-5)
  const [yMax, setYMax] = useState(-5)
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
    let number = parseInt(num)
    if(!isNaN(number)&& checkMinMax(xMin, num))
    {
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

  return (
    <div id="graph-controls">
        <h1>Graph Controls</h1>
  
        <h3>Set Scale</h3>
        <div className="control-row">
            <label>X Range</label>
            <input type="text"   onChange={(event) => handleXMinChange(event.target.value) } />
            <p> - </p>
            <input  onChange={(event) => handleXMaxChange(event.target.value)} />
            <label>Step</label>
            <input   onChange={(event) => handleXStepChange(event.target.value)} />
        </div>

        <div className="control-row">
            <label>Y Range</label>
            <input   onChange={(event) => handleYMinChange(event.target.value)} />
            <p> - </p>
            <input   onChange={(event) => handleYMaxChange(event.target.value)} />
            <label>Step</label>
            <input v  onChange={(event) => handleYStepChange(event.target.value)} />
        </div>
    </div>
  );
};

export default GraphControls;
