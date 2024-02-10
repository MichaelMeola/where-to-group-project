import React, { useEffect, useState } from "react";
import MyCalendarCard from "./MyCalendarCards";
import { useEventsStore, useProfileStore } from "../../globalState.jsx";
import { Box, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom'

export default function MyCalendar() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const theme = useTheme();
  const [sortBy, setSortBy] = useState("date");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/calendarEvents`)
      .then((res) => {
        console.log(res.data);
        setCurrentEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteEvent = (eventId) => {
    setCurrentEvents((prevEvents) =>
      prevEvents.filter((event) => event.eventId !== eventId)
    );
  };

  const handleClickAddEventButton = () => {
    navigate("/events")
  }

  return (
    <>
      <Box
        sx={{
          postion: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          py: 2,
          mb: 1,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container>
            <DateTimePicker
              label="Filter Dates"
              sx={{ bgcolor: 'white' }}
            />
          </Container>
        </LocalizationProvider>
      </Box>
      <Grid container spacing={1}>
      {currentEvents.length === 0 ? (
        <Grid container sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', m: '140px 0px 230px 0px'}}>
          <Typography variant="body1" color="text.primary">
            No events found in calendar.
          </Typography>
          <Button variant="contained" onClick={handleClickAddEventButton} sx={{mt: '10px'}}>
            Add Event
          </Button>
        </Grid>
        ) : (
          currentEvents.map((eventsObj) => (
              <MyCalendarCard
                initialEventData={eventsObj}
                key={eventsObj.id}
                onDelete={handleDeleteEvent}    
            />
          ))
        )}
      </Grid>
      <Box sx={{height: '70px'}}></Box>
    </>
  );
}
