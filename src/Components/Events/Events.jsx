import React, { useEffect, useState } from "react";
import axios from "axios";
import { useEventsStore, useProfileStore } from "../../globalState.jsx";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Events = () => {
  const navigate = useNavigate();
  const { events, setEvents } = useEventsStore();
  const { profile } = useProfileStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortBy, setSortBy] = useState("likes");
  const [filterBy, setFilterBy] = useState([]);
  const sortEvents = (events, sortBy) => {
    events.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return b.likes - a.likes;
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  
  const handleFilterByChange = (event, value) => {
    setFilterBy(value);
  };

  useEffect(() => {
    axios
    .get("/api/events")
    .then((response) => {
        const fetchedEvents = response.data;
        sortEvents(fetchedEvents, sortBy);
        setEvents(fetchedEvents);
        console.log(fetchedEvents);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!profile.username) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let filteredEvents = events;
    
    if (filterBy.includes("My Events")) {
      filteredEvents = events.filter(
        (event) => event.user.username === profile.username
        );
      }
      
      if (selectedDate) {
        filteredEvents = filteredEvents.filter(
        (event) =>
        new Date(event.date).toLocaleDateString() ===
          selectedDate.$d.toLocaleDateString()
          );
    }
    sortEvents(filteredEvents, sortBy);
    setEvents(filteredEvents);
  }, [selectedDate, sortBy, filterBy]);
  
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  console.log(events.user);
  
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" py={1}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container components={["DatePicker"]}>
            <MobileDatePicker
              label="Choose Event Date"
              onChange={handleDateChange}
            />
          </Container>
        </LocalizationProvider>
      </Box>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Autocomplete
          multiple
          id="filters"
          options={["18+", "21+", "My Events"]}
          disableCloseOnSelect
          onChange={handleFilterByChange}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Filter By..." placeholder="Filters" />
          )}
        />
        <FormControl sx={{ ml: 2 }}>
          <InputLabel id="sort-by-label">Sort By:</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <MenuItem value="likes">Most Liked</MenuItem>
            <MenuItem value="date">Event Date</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Container sx={{ py: 3 }} maxWidth="md">
        {events.length === 0 ? (
          <Typography variant="body1" color="text.primary">
            No events found for the selected date.
          </Typography>
        ) : (
          <Grid container spacing={1}>
            {events.map((event) => (
              <Grid item key={event.eventId} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: '3px',
                    boxShadow: '0px 0px 0px 1px'
                  }}
                >
                  <CardHeader
                    avatar={<Avatar src={event.user.profilePic} />}
                    sx={{ height: "60px" }}
                    title={`Host: @${event.user.username}`}
                  />
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${event.image}`}
                    alt="Event Image"
                    sx={{borderRadius: '0px'}}
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
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {event.likes}
                      </Typography>
                    </div>
                    <Checkbox
                      onClick={() => {
                        if (event.SavedEvents[0]) {
                          handleDeleteFromCalendar(event);
                        } else {
                          handleAddToCalendar(event);
                        }
                      }}
                      {...label}
                      defaultChecked={event.SavedEvents[0] ? true : false}
                      icon={<AddIcon />}
                      checkedIcon={<CheckIcon style={{ color: "green" }} />}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Events;
