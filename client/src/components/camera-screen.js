import React, { useState, useEffect, useContext } from "react";
import { Grid, makeStyles, Box, Typography, Button } from "@material-ui/core";
import { Spinner } from "../components/index";

import { CameraContext } from "../context-provider/camera";
import { ToastContext } from "../context-provider/toast";
import { UserContext } from "../context-provider/user";
import { ModalContext } from "../context-provider/global-modal";
import userActionTypes from "../action-type/user";

const CamToolBar = ({ capture, captured, setCaptured, newPost }) => {
  const classes = useStyles();
  const [description, setDesc] = useState("");

  return (
    <Grid
      item
      xs={12}
      container
      className={classes.camToolBar}
      justify="center"
    >
      {!captured ? (
        <Box
          className={classes.captureBtn}
          onClick={() => {
            let status = capture();
            if (status === "done") {
              setCaptured(!captured);
            }
          }}
        />
      ) : (
        <Box className={classes.desc}>
          <Typography variant="subtitle2">
            Add description (optional)
          </Typography>

          <Box className={classes.descBox}>
            <textarea
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
              }}
              className={classes.textarea}
              name="description"
              maxLength={500}
              rows={5}
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </Box>

          <Box style={{ display: "flex" }}>
            <Button
              style={{ margin: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => newPost(description)}
            >
              Post
            </Button>
            <Button
              style={{ margin: "10px" }}
              variant="text"
              color="secondary"
              onClick={() => {
                setCaptured(!captured);
              }}
            >
              Retake
            </Button>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

const CameraScreen = () => {
  const { camera } = useContext(CameraContext);
  const filters = camera.filterList;
  const classes = useStyles();
  const [captured, setCaptured] = useState(false);
  const { toast } = useContext(ToastContext);
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  /**
   * For filter
   */
  // const [tabIndex, setIndex] = useState(0);

  // const next = () => {
  //   if (tabIndex < filters.length - 1) {
  //     setIndex(tabIndex + 1);
  //   }
  // };

  // const prev = () => {
  //   if (tabIndex > 0) {
  //     setIndex(tabIndex - 1);
  //   }
  // };

  useEffect(() => {
    // set up the camera
    camera.setUp();
    return () => {
      camera.destroy();
      camera.stop();
    };
  }, []);

  /**
   * For filter
   */
  // useEffect(() => {
  //   camera.applyFilter(tabIndex);
  // }, [tabIndex]);

  const newPost = (desc) => {
    setLoading(true);
    let dataUrl = camera.file();
    try {
      const data = {
        description: desc,
        postImage: dataUrl,
      };
      var headers = new Headers();
      const token = localStorage.getItem("social-app-user");
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      };

      fetch("http://localhost:5000/post/new", requestOptions)
        .then((response) => response.json())
        .then(({ data: { type, message, result } }) => {
          setLoading(false);
          if (type === "error") {
            toast({ type: "error", message: "Error! PLease try again later" });
          }
          if (type === "success") {
            toast({ type: "success", message });
            dispatch({
              type: userActionTypes.UPDATE_POSTS,
              payload: { post: result },
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    } catch (error) {
      toast({ type: "error", message: "Error! PLease try again later" });
      console.log(error);
      setLoading(false);
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root}>
      <video
        id="video"
        style={{ width: "100%", objectFit: "cover" }}
        className={!captured ? "" : classes.display}
      >
        {" "}
        Camera Loading
      </video>
      <img
        id="capturedImage"
        style={{ width: "100%", objectFit: "cover" }}
        className={captured ? "" : classes.display}
      ></img>
      <canvas id="canvas" style={{ zIndex: -1 }}></canvas>

      {/**
       * For filter
       */
      /* <Grid item container justify="center" align="center">
    <Grid item xs={3}>
      <IconButton
        color="primary"
        aria-label="move-filter-back"
        component="span"
        onClick={prev}
      >
        <ArrowBackIos />
      </IconButton>
    </Grid>
    <Grid item xs={6}>
      <Typography align="center">{filters[tabIndex].title}</Typography>
    </Grid>
    <Grid item xs={3}>
      <IconButton
        color="primary"
        aria-label="move-filter-forward"
        component="span"
        onClick={next}
      >
        <ArrowForwardIos />
      </IconButton>
    </Grid>
  </Grid> */}
      <CamToolBar
        capture={camera.capture}
        captured={captured}
        setCaptured={setCaptured}
        newPost={newPost}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100vh",
      position: "relative",
    },
    video: {
      "-webkit-transform": "scaleX(-1)",
      transform: "scaleX(-1)",
      width: "100%",
      height: "100vh",
    },
    display: {
      display: "none",
    },
    captureBtn: {
      width: "50px",
      height: "50px",
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "50%",
      boxShadow: theme.shadows[24],
      border: "1.6px solid white",
    },
    camToolBar: {
      position: "absolute",
      bottom: "10%",
      left: 0,
      zIndex: theme.zIndex["tooltip"],
      width: "100%",
    },
    filter: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.secondary.light,
      transformOrigin: "center",
    },
    textarea: {
      resize: "none",
      overflow: "auto",
      outline: "none",
      border: "none",
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      width: "100%",
      backgroundColor: "#FADCDE",
    },
    input: {
      display: "none",
    },
    desc: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    descBox: {
      width: "80%",
      padding: theme.spacing(2),
      backgroundColor: "#FADCDE",
    },
  };
});

export default CameraScreen;
