import React, { useContext } from "react";
import { Box, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { ModalContext } from "../context-provider/global-modal";
import { CameraScreen } from "./index";
const FaceCam = () => {
  const { handleClick, handleClose } = useContext(ModalContext);
  return (
    <IconButton
      color="secondary"
      aria-label="take picture"
      component="span"
      onClick={() =>
        handleClick(
          <CameraScreen handleClose={handleClose} />,
          "Take Photo",
          false
        )
      }
    >
      <PhotoCamera />
    </IconButton>
  );
};

export default FaceCam;
