import { createContext, useState } from "react";
import { PenOptions } from "../models/PenOptions";

export const InputContext = createContext([0]);

export const InputProvider = ({ children }) => {
  const [penSelection, setPenSelection] = useState(PenOptions.pen);
  const [points, setPoints] = useState([]);
  const [linePoints, setLinePoints] = useState([]);
  const [dots, setDots] = useState([]);
  const [redraw, setRedraw] = useState(false);

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
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
