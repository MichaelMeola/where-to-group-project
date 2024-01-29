import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Container } from '@mui/material'


export default function Create() {
  return (
    <Box component='form' sx={{
      '& > :not(style)': { m: 2, s: 1, width: '30ch' },
    }}
    noValidate
    autoComplete="on">
      <TextField label='Event Name' sx={{ bgcolor: 'white', color: 'black'}}></TextField>
      <TextField label='Address' sx={{ bgcolor: 'white'}}></TextField>
      <TextField label='Description' sx={{ bgcolor: 'white'}}></TextField>
      <TextField label='Image' sx={{ bgcolor: 'white'}}></TextField>
      <TextField label='Ages' sx={{ bgcolor: 'white'}}></TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container components={['DatePicker']} >
        <DatePicker label="Basic date picker" sx={{ bgcolor: 'white'}}/>
      </Container>
    </LocalizationProvider>
    </Box>
  )
}
