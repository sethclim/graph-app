import { createContext,useState } from "react";
import { Range } from "../models/Range";

export const GraphContext = createContext([0]);

export const GraphProvider = ({ children }) => {
  const [xRange, setXRange] = useState(new Range(-5,5,1));
  const [yRange, setYRange] = useState(new Range(-5,5,1));

  const [origin, setOrigin] = useState({x: 0, y: 0})   

  return ( 
    <GraphContext.Provider
      value={{
        setXRange,
        setYRange,
        setOrigin,
        xRange,
        yRange,
        origin
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};