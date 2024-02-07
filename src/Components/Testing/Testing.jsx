import React from "react";
import { useEventsStore, useProfileStore } from "../../globalState.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { useMapStore } from "../../globalState.jsx";

function MapModal(props) {
  const { events, setEvents } = useEventsStore();
  const { isToggle, toggle } = useMapStore();
  const { address } = props;

  console.log(address);
  console.log(isToggle, "isToggle");
  const theme = createTheme({
    palette: {
      primary: {
        main: "#bf00ff",
      },
      secondary: {
        main: "#ac00e6",
      },
      background: {
        main: "#99D5C9",
      },
    },
    typography: {
      fontSize: 13,
      display: "flex",
      flexDirection: "column",
    },
    modal: {
      padding: 0,
    },
  });

  theme.typography.h3 = {
    color: "#ac00e6",
    padding: "5px 0px 5px 0px",

    fontSize: "1.2rem",
    display: "flex",
    flexDirection: "column",
  };
  theme.typography.p = {
    color: "black",
  };

  const MapBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 50,
    width: "100%",
    height: "100%",
    maxWidth: 800,
    minWidth: 150,
    minHeight: 250,
    maxHeight: 400,
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      padding: 15,
    },
    [theme.breakpoints.up("md")]: {
      // pb: "50px",
      minWidth: 600,
      maxWidth: 800,
    },
    "& > :not(style)": { width: "100%", minWidth: 300, maxWidth: 800 },
  }));

  const MapModal = styled(Modal)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  }));
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth > 767 && window.innerHeight > 400
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024 && window.innerHeight > 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    textAlign: "center",
    borderRadius: 3,
  };

  let mapHeight = "";
  let mapWidth = "";

  if (isDesktop) {
    (mapHeight = "350"), (mapWidth = "350");
  } else {
    (mapHeight = "100"), (mapWidth = "5%");
  }
  if (isToggle && address) {
    let currAddress = address.replaceAll(" ", "+");

    return (
      <ThemeProvider theme={theme}>
        <MapModal
          open={isToggle}
          onClose={() => toggle()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MapBox>
            <Typography variant="h3">{address}</Typography>
            <iframe
              width="350"
              height="350"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC25VIhEjKJd0V1tKTNfe5B-Zl-6Ii1G8I&q=${currAddress}`}
            />
          </MapBox>
        </MapModal>
      </ThemeProvider>
    );
  } else {
    return null;
  }
}

export default MapModal;
