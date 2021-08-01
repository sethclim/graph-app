import { createContext, useState } from "react";

export const InputContext = createContext([0]);

export const InputProvider = ({ children }) => {
  const [penSelection, setPenSelection] = useState(null);
  const [points, setPoints] = useState([]);
  const [dots, setDots] = useState([]);
  const [redraw, setRedraw] = useState(false);

  return (
    <InputContext.Provider
      value={{
        penSelection,
        setPenSelection,
        points,
        setPoints,
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
