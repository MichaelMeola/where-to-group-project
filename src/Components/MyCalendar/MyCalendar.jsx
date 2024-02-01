import React from "react";
import { Box, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconButton from '@mui/material/IconButton';


export default function MyCalendar() {
  const theme = useTheme();
  return (
    <>
    <Box 
    sx={{
      postion: 'fixed',
      top: 0,
      left: 0,
      bgcolor: 'white',
      display: 'flex',
      justifyContent: 'center',
      py: 2,
    }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <MobileDatePicker label="My Calendar" />
        </Container>
      </LocalizationProvider>
    </Box>
    

    <Card sx={{ display: 'flex' }}>
    <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://media.istockphoto.com/id/474422642/photo/dancing-at-the-beach.jpg?s=612x612&w=0&k=20&c=XBeiIxZOmJS8tGH4L0hXhc5Y_DTAyGw0clZESUjZEcs="
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Smoking Big Doinks
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Grip Chezley
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 6, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
    </>
  );
}




// {/* <Container
// justifyContent="center"
// alignItems="center"
// py={5}
// sx={{ height: '100vh', bgcolor: "white", pt: 2 }}
// >
// <Box
//   display="flex"
//   justifyContent="center"
//   alignItems="center"
//   sx={{ mb: 10, bgcolor: "white", color: 'black' }}
// >
//   <LocalizationProvider dateAdapter={AdapterDayjs} >
//     <MobileDatePicker displayWeekNumber label="Your Upcoming Events" />
//   </LocalizationProvider> 
// </Box>

// <Card>
//   <CardMedia
//    />
//    <CardContent>
//     <Typography></Typography>
//    </CardContent>
// </Card>
// </Container> */}