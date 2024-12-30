import { createContext, PropsWithChildren, useState } from "react";
import { PenOptions } from "../models/PenOptions";
import { Point } from "../models/Point";

export interface IInputContext {
  penSelection : PenOptions,
  setPenSelection : Function,
  points : number[],
  setPoints : Function,
  linePoints : number[],
  setLinePoints : Function,
  dots : Point[],
  setDots : Function,
  redraw : boolean,
  setRedraw : Function,
  color : string,
  setColor : Function,
  loadGraph : Function
}

const defaultInputContext : IInputContext = {
  penSelection : PenOptions.line,
  setPenSelection : () => null,
  points : [],
  setPoints : () => null,
  linePoints : [],
  setLinePoints : () => null,
  dots : [],
  setDots : () => null,
  redraw : false,
  setRedraw : () => null,
  color : "#FF0000",
  setColor : () => null,
  loadGraph: () => null,
}

export const InputContext = createContext<IInputContext>(defaultInputContext);

export const InputProvider = (props : PropsWithChildren<any>) => {
  const [penSelection, setPenSelection] = useState(PenOptions.pen);
  const [points, setPoints] = useState<number []>([]);
  const [linePoints, setLinePoints] = useState([]);
  const [dots, setDots] = useState([]);
  const [redraw, setRedraw] = useState(false);
  const [color, setColor] = useState("#EB144C");

  const loadGraph = (graph : any) =>{
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
      {props.children}
    </InputContext.Provider>
  );
};
