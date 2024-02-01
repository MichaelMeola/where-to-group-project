import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useProfileStore } from "../../globalState.jsx";
import CircularProgress from "@mui/material/CircularProgress";


export default function Create() {
  const { profile } = useProfileStore();
  const [eventName, setEventName] = useState(`${profile.username}'s Event`);
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ages, setAges] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(null);
  const [errorMessage, setErrorMessge] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        navigate("/events");
      }, 1200);
    }
  };

  const handleCreateEvent = async () => {
    if (
      !eventName ||
      !address ||
      !imageUrl ||
      !ages ||
      !description ||
      !dateTime
    ) {
      setErrorMessge(
        "Please fill out all of the input fields before adding an event."
      );
    } else {
      const newEvent = {
        hostName: profile.username,
        hostPic: profile.profilePic,
        name: eventName,
        date: dateTime,
        address,
        description,
        image: imageUrl,
        ages: +ages,
      };

      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });

        if (response.ok) {
          const createdEvent = await response.json();
          console.log("Event created:", createdEvent);
          setEventName("");
          setAddress("");
          setImageUrl("");
          setAges("");
          setDescription("");
          setDateTime("");
          handleButtonClick();
        } else {
          console.error("Failed to create event:", response.status);
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <Card sx={{maxWidth: 800, mb: 20, mt: 2 }}>
      <CardMedia
        sx={{ height: 240 }}
        image="https://img.freepik.com/premium-vector/event-planner-template-hand-drawn-cartoon-illustration-with-planning-schedule-calendar-concept_2175-7747.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {eventName}
        </Typography>
      </CardContent>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, s: 1, width: "32ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <TextField
          label="Ages"
          value={ages}
          onChange={(e) => setAges(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Date & Time"
            value={dateTime}
            onChange={(newValue) => setDateTime(newValue)}
          />
        </LocalizationProvider>
      </Box>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, textAlign: "center" }}>
          {errorMessage}
        </Alert>
      )}
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        size="large"
        sx={{ mt: 3, mb: 5 }}
        onClick={handleCreateEvent}
      >
        {loading ? (
          <CircularProgress
            size={26}
            sx={{
              color: 'white',
            }}
          />
        ) : (
          "Create Event"
        )}
      </Button>
    </Card>
  );
}
