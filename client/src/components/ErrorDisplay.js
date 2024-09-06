import { Alert, Snackbar } from "@mui/material";
import { IconAlertTriangleOff } from "@tabler/icons-react";
import React from "react";

const ErrorDisplay = ({ message, handleClose }) => {
  return (
    <div className=" w-full ">
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{
          position: "absolute",
          width: "100%",
          "&.MuiSnackbar-root": { bottom: "18.4rem", left: "0" },
        }}
      >
        <Alert
          icon={<IconAlertTriangleOff stroke={1.5} color="#EF0107" />}
          onClose={handleClose}
          severity="warning"
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderWidth:"0.1rem",
            borderColor: "#EF0107",
            color: "#EF0107",
            fontWeight: "400",
            fontSize: "1rem",
          }}
        >
          {message}{" "}
        </Alert>
      </Snackbar>
      {/* <div open={open} onClick={handleClose} className="w-[30rem] h-[10rem] z-20 opacity-[0.8] absolute bg-red-300 border">
        {message}
      </div> */}
    </div>
  );
};

export default ErrorDisplay;
