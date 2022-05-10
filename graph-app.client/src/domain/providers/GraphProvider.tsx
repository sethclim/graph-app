import { createContext,useState } from "react";
import { Dimension } from "../models/Dimension";
import { Point } from "../models/Point";
import { Range } from "../models/Range";

interface GraphContextInterface {
  setXRange : Function,
  setYRange  : Function,
  setOrigin : Function,
  xRange : Range,
  yRange : Range,
  origin : Point,
  dimensions : Dimension,
  setDimensions : Function
}


export const GraphContext = createContext<GraphContextInterface | null>(null);

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