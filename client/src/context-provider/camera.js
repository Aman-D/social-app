import React, { createContext } from "react";
import Camera from "../helper/camera";
export const CameraContext = createContext();
const CameraProvider = ({ children }) => {
  let cameraObj = new Camera();
  const cleanUp = () => {
    cameraObj = new Camera();
  };
  return (
    <CameraContext.Provider value={{ camera: cameraObj, cleanUp: cleanUp }}>
      {children}
    </CameraContext.Provider>
  );
};

export default CameraProvider;
