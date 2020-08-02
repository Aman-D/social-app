import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { FaceCam } from "./index";
import CameraProvider from "../context-provider/camera";
const NavCam = () => {
  return (
    <CameraProvider>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <FaceCam />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="center">
            SOCIAL APP
          </Typography>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </CameraProvider>
  );
};

export default NavCam;
