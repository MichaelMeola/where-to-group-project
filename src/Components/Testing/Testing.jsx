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
import {
  createTheme,
  ThemeProvider,
  styled,
} from "@mui/material/styles";
import { CircularProgress } from '@mui/material';


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
  }
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
  minWidth: 300,
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    // width: "60%",
    // pb: "15px",
    // pt: "5px",
    padding: 10,

    // backgroundColor: "blue",
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
  padding: 20
}));


function Testing() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767 && window.innerHeight > 400);
  console.log("desktop",isDesktop);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024 && window.innerHeight > 400)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [toggleMap, setToggleMap] = useState(false);
  const { events, setEvents } = useEventsStore();
  const [mapId, setMapId] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(toggleMap);
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

  useEffect(() => {
    axios
      .get("/api/events")
      .then((response) => {
        const fetchedEvents = response.data;
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let mapHeight = ""
  let mapWidth = ""
  let GoogleEvents = events.map((event) => {
    let currAddress = event.address.replace(" ", "+");
    if(isDesktop) {
      mapHeight = "350", 
      mapWidth = "350" 
     }else
     {
      mapHeight = "100", 
      mapWidth = "5%"
     }
    if(toggleMap) {
    return (
      <iframe
        width={mapWidth}
        height={mapHeight}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC25VIhEjKJd0V1tKTNfe5B-Zl-6Ii1G8I&q=${currAddress}`}
      ></iframe>
    );
    }
    else {
      return null;
    }
  });

  const AddressViewModal = () => {
    console.log(events[mapId]);
    // console.log('hit');
    let currAddress = events[mapId].address.replaceAll(" ", "+")

    console.log(loading);
    return (
      // <ThemeProvider theme={theme}>
        <MapModal
        open={toggleMap}
        onClose={() => setToggleMap(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
                <MapBox >
                {loading && (
                <CircularProgress sx={{ postition: "abosolute", top:"50vh", left: "50vw"}}/>
                  )}
                  <Typography variant="h3">{events[mapId].address}</Typography>
                  <iframe
                  width="350"
                  height="350"
                  referrerPolicy='no-referrer-when-downgrade'
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC25VIhEjKJd0V1tKTNfe5B-Zl-6Ii1G8I&q=${currAddress}`}
                  />
                  
                  
            </MapBox>

        </MapModal>
        // </ThemeProvider>
    )
    
  };
  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500 )
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
      <main>
        {toggleMap && AddressViewModal()}
        <Container sx={{ py: 3 }} maxWidth="md">
          {events.length === 0 ? (
            <Typography variant="body1" color="text.primary">
              No events found for the selected date.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {events.map((event) => (
                <Grid item key={event.eventId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => {
                        console.log('hit');
                        handleClick();
                      setToggleMap(true);
                      setMapId(event.eventId);
                    }}
                  >
                    <CardHeader
                      // avatar={<Avatar>{event.user.profilePic}</Avatar>}
                      sx={{ height: "60px" }}
                      title={`Host: @${event.user.username}`}
                    />
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${event.image}`}
                      alt="Event Image"
                    />
                    <CardContent>
                      <Typography variant="body1" color="text.primary">
                        {event.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.date).toLocaleString("en-US", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.ages}+
                      </Typography>
                    </CardContent>
                    <CardActions
                      disableSpacing
                      sx={{
                        marginTop: "auto",
                      }}
                    >
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {event.likes}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
        </ThemeProvider>
    </div>
  );
}

export default Testing;
