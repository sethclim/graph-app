import { createContext,useState } from "react";
import { Dimension } from "../models/Dimension";
import { Point } from "../models/Point";
import { Range } from "../models/Range";

interface GraphContextInterface {
  setXRange : (range: Range) => any,
  setYRange  : (range: Range) => any,
  setOrigin : Function,
  xRange : Range,
  yRange : Range,
  origin : Point,
  dimensions : Dimension,
  setDimensions : Function
}

const defaultGraphContext = {
  setXRange : () => null,
  setYRange : () => null,
  setOrigin : () => null,
  xRange : new Range(-7,-4,1),
  yRange : new Range(-7,-4,1),
  origin : new Point(0,0),
  dimensions : new Dimension(0,0),
  setDimensions : () => null
}




export const GraphContext = createContext<GraphContextInterface>(defaultGraphContext);

export const GraphProvider = (props : any) => {
  const [xRange, setXRange] = useState(new Range(-5,5,1));
  const [yRange, setYRange] = useState(new Range(-5,5,1));

  const [origin, setOrigin] = useState({x: 0, y: 0})   

  const [dimensions, setDimensions] = useState(new Dimension(0,0));

  const sampleAppContext: GraphContextInterface = {
    setXRange, 
    setYRange,
    setOrigin,
    xRange,
    yRange,
    origin,
    dimensions, 
    setDimensions 
  };

  return ( 
    <GraphContext.Provider value={sampleAppContext}>
      {props.children}
    </GraphContext.Provider>
  );
};