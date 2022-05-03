import { createContext, useState } from "react";
import { PenOptions } from "../models/PenOptions";

export const InputContext = createContext([0]);

export const InputProvider = ({ children }) => {
  const [penSelection, setPenSelection] = useState(PenOptions.pen);
  const [points, setPoints] = useState([]);
  const [linePoints, setLinePoints] = useState([]);
  const [dots, setDots] = useState([]);
  const [redraw, setRedraw] = useState(false);
  const [color, setColor] = useState("#EB144C");

  const loadGraph = (graph) =>{
    if(graph.points != null){
      setPoints(graph.points)
    }

    if(graph.dots != null){
      setDots(graph.dots)
    }
    if(graph.line != null){
      setLinePoints(graph.line)
    }

    setRedraw(true)
  }

  return (
    <InputContext.Provider
      value={{
        penSelection,
        setPenSelection,
        points,
        setPoints,
        linePoints,
        setLinePoints,
        dots,
        setDots,
        redraw,
        setRedraw,
        color,
        setColor,
        loadGraph
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
