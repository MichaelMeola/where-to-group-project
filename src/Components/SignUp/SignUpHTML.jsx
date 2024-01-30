import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from 'react-bootstrap/Modal';
import SignUpHTML from './SignUpHTML.jsx';


const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#bf00ff'
      },
      secondary: {
        main: '#ac00e6'
      },
      background: {
        main: "#99D5C9"
      }
    }
  });


export default function SignUpHTML() {

    return (
        <ThemeProvider theme={defaultTheme}>
            
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleReg} sx={{ mt: 3 }}>
                                
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    autoFocus
                                    onChange={(e) => setUsernameValue(e.target.value)}
                                    value={usernameValue}
                                    error={usernameValue.length <= 4}
                                    helperText={usernameValue.length <= 4 ? 'Username must be at least 4 characters' : null }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">@</InputAdornment>
                                        ),
                                    
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    value={emailValue}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    value={passwordValue}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: '#99D5C9' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2" >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}