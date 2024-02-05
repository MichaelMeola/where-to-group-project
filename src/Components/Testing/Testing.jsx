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

function Testing() {
  const [toggleMap, setToggleMap] = useState(false);
  const { events, setEvents } = useEventsStore();
  const [mapId, setMapId] = useState(null);


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
    pt: 2,
    px: 4,
    pb: 3,
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

  let GoogleEvents = events.map((event) => {
    let currAddress = event.address.replace(" ", "+");
    // return <p>{event.address}</p>
    return (
      <iframe
        width="350"
        height="350"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC25VIhEjKJd0V1tKTNfe5B-Zl-6Ii1G8I&q=${currAddress}`}
      ></iframe>
    );
  });

  const AdressViewModal = () => {
    console.log(events[mapId]);
    // console.log('hit');
    let currAddress = events[mapId].address.replaceAll(" ", "+")

    
    return (
        <Modal
        open={toggleMap}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
                <Box sx={{ ...style, width: "80%" }}>
                {/* <p>{currAddress}</p> */}
                <iframe
                width="350"
                height="350"
                referrerPolicy='no-referrer-when-downgrade'
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC25VIhEjKJd0V1tKTNfe5B-Zl-6Ii1G8I&q=${currAddress}`}
                >

                </iframe>
            </Box>

        </Modal>
    )
    
  };
  return (
    <div>
      <main>
        {toggleMap && AdressViewModal()}
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
    </div>
  );
}

export default Testing;
