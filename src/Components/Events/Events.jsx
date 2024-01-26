import React, { useEffect } from "react";
import axios from "axios";
import { useEventsStore, useProfileStore } from "../../globalState.jsx";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Events = () => {
  const { events, setEvents } = useEventsStore();

  useEffect(() => {
    axios
      .get("/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setEvents]);



  const eventCards = events.map((event) => (
    <Grid item key={event.eventId} xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image="https://source.unsplash.com/random?wallpapers"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {event.name}
          </Typography>
          <Typography>
            {event.description}
          </Typography>
          <Typography>
            {event.address}
          </Typography>
          <Typography>
            {event.date}
          </Typography>
          <Typography>
            {event.ages}+
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));

  console.log(profile);

  return <div style={{padding: '70px 0px 0px 0px'}}>{eventCards}</div>;
};

export default Events;
