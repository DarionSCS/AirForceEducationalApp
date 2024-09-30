import React, { createContext, useContext, useState } from "react";

const RotationContext = createContext();

export const useRotation = () => useContext(RotationContext);

export const RotationProvider = ({ children }) => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <RotationContext.Provider
      value={{ rotation, setRotation, isPopupVisible, setIsPopupVisible }}
    >
      {children}
    </RotationContext.Provider>
  );
};
