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


export default function MyCalendar() {
  const [currentEvents, setCurrentEvents] = useState([])
  const theme = useTheme();
  const [sortBy, setSortBy] = useState("date");


  useEffect(() => {
    axios.get(`/api/calendarEvents`)
    .then((res) => {
      console.log(res.data)
      setCurrentEvents(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const cards = currentEvents.map((eventsObj) => 
    <MyCalendarCard
      initialEventData={eventsObj}
      key={eventsObj.id}
    />
  )

  return (
    <>
      <Box
        sx={{
          postion: "fixed",
          top: 0,
          left: 0,
          bgcolor: "white",
          display: "flex",
          justifyContent: "center",
          py: 2,
          mb: 1,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container>
            <DateTimePicker label="Filter Dates" sx={{ borderRadius: "10px" }}/>
          </Container>
        </LocalizationProvider>
      </Box>
        <Grid container spacing={1}>
          {cards}
        </Grid>
    </>
  );
}