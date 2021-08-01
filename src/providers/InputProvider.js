import React, { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [penSelection, setPenSelection] = useState(null);
  return (
    <InputContext.Provider
      value={{
        penSelection,
        setPenSelection,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
