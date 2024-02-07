import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockPersonSharpIcon from '@mui/icons-material/LockPersonSharp';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProfileStore } from "../../globalState.jsx";
import './Login.css'


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        whereto.com
      </Link>{' '}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


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

export default function Login() {

  // const [ showPassword, setShowPassword ] = React.useState(false)
  const navigate = useNavigate();
  const { profile, setProfile } = useProfileStore();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");


  // const handleClickShowPassword = () => setShowPassword((show) => !show)

  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement> ) => {
  //   event.preventDefault()
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailValue,
      password: passwordValue,
    };
    const res = await axios.post("/api/login", data);

    if (res.data.success) {
      setProfile(res.data.profile);
      navigate("/events");
    }
    if (!res.data.success) {
      alert(res.data.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white', height: '540px', mb: 13}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: "primary.main"}}>
            <LockPersonSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color='black'>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
            />
            <Button
              type="submit"
              color='primary'
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4, color: 'gray' }} />
      </Container>
    </ThemeProvider>
  );
}
