import React from 'react'
import { Box, Container } from '@mui/material'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


export default function MyCalendar() {

  return (
    <Container justifyContent='center' alignItems='center' py={5} sx={{ pb: 15, bgcolor: 'purple' }}> 
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 30, bgcolor: 'white' }} >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
            views={['day']} 
            label="Your Upcoming Events"
            />
        </LocalizationProvider>
      </Box>
      
    </Container>
  )
}
