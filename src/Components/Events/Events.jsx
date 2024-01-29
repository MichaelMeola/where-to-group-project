import React, { useEffect, useState } from "react";
import axios from "axios";
import { useEventsStore, useProfileStore } from "../../globalState.jsx";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Container, Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Events = () => {
  const navigate = useNavigate();
  const { events, setEvents } = useEventsStore();
  const { profile } = useProfileStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!profile.username) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter(
        (event) =>
          new Date(event.date).toLocaleDateString() ===
          selectedDate.$d.toLocaleDateString()
      );
      setFilteredEvents(filteredEvents);
    } else {
      setFilteredEvents(events);
    }
  }, [selectedDate, events]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" paddingTop={8}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container components={["DatePicker"]}>
            <DatePicker label="Event Date" onChange={handleDateChange} sx={{ bgcolor: 'white'}}/>
          </Container>
        </LocalizationProvider>
      </Box>
      <Container sx={{ py: 3 }} maxWidth="md">
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item key={event.eventId} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  avatar={<Avatar></Avatar>}
                  sx={{ height: "60px" }}
                  title={`Host: @${event.createdBy}`}
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
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {event.likes}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Events;
