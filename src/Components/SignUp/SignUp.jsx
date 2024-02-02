import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../globalState.jsx";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="primary"
      align="center"
      {...props}

    >
      {"Copyright Â© "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const { profile, setProfile } = useProfileStore();
  const [toggleModal, setToggleModal] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  function modalChange() {
    setToggleModal(!toggleModal);
    console.log("hit modal change");
  }

  const handleReg = async (e) => {
    e.preventDefault();
    const data = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };

    const res = await axios.post("/api/register", data);
    if (!res.data.success) {
      alert(res.data.message);
    }
    if (res.data.success) {
      modalChange();
      console.log('registered: ', res.data.profile);
      setProfile(res.data.profile);
    }
    console.log(res.data.success);
  };

  function routeLogin() {
    navigate("/events");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Modal show={toggleModal} onHide={modalChange}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Account created, proceed to login?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalChange}>
            Close
          </Button>
          <Button variant="primary" onClick={routeLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Container 
      component="main" 
      maxWidth="xs"
      sx={{ height: '550px', backgroundColor: 'white'}}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: '15px 0px 0px 0px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleReg} sx={{ mt: 3}}>
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
                  helperText={
                    usernameValue.length <= 4
                      ? "Username must be at least 4 characters"
                      : null
                  }
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black',
                      },
                      '&:hover fieldset': {
                        borderColor: 'red',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'purple',
                      },
                    },
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black',
                      },
                      '&:hover fieldset': {
                        borderColor: 'red',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'purple',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  style={{ color: '#d858fc', textDecoration: 'none'}}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );

  //   if (toggleModal) {
  //     return (
  //       <ThemeProvider theme={defaultTheme}>

  //         <Container component="main" maxWidth="xs">
  //           <CssBaseline />
  //           <Box
  //             sx={{
  //               marginTop: 8,
  //               display: "flex",
  //               flexDirection: "column",
  //               alignItems: "center",
  //             }}
  //           >
  //             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
  //               <LockOutlinedIcon />
  //             </Avatar>
  //             <Typography component="h1" variant="h5">
  //               Sign up
  //             </Typography>
  //             <Box
  //               component="form"
  //               noValidate
  //               onSubmit={handleReg}
  //               sx={{ mt: 3 }}
  //             >
  //               <Grid container spacing={2}>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     autoComplete="given-name"
  //                     name="username"
  //                     required
  //                     fullWidth
  //                     id="username"
  //                     label="username"
  //                     autoFocus
  //                     onChange={(e) => setUsernameValue(e.target.value)}
  //                     value={usernameValue}
  //                     error={usernameValue.length <= 4}
  //                     helperText={
  //                       usernameValue.length <= 4
  //                         ? "Username must be at least 4 characters"
  //                         : null
  //                     }
  //                     InputProps={{
  //                       startAdornment: (
  //                         <InputAdornment position="start">@</InputAdornment>
  //                       ),
  //                     }}
  //                   />
  //                 </Grid>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     required
  //                     fullWidth
  //                     id="email"
  //                     label="Email Address"
  //                     name="email"
  //                     autoComplete="email"
  //                     onChange={(e) => setEmailValue(e.target.value)}
  //                     value={emailValue}
  //                   />
  //                 </Grid>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     required
  //                     fullWidth
  //                     name="password"
  //                     label="Password"
  //                     type="password"
  //                     id="password"
  //                     autoComplete="new-password"
  //                     onChange={(e) => setPasswordValue(e.target.value)}
  //                     value={passwordValue}
  //                   />
  //                 </Grid>
  //               </Grid>
  //               <Button
  //                 type="submit"
  //                 fullWidth
  //                 variant="contained"
  //                 sx={{ mt: 3, mb: 2 }}
  //                 style={{ backgroundColor: "#99D5C9" }}
  //               >
  //                 Sign Up
  //               </Button>
  //               <Grid container justifyContent="flex-end">
  //                 <Grid item>
  //                   <Link
  //                     href="/login"
  //                     variant="body2"
  //                     style={{ color: "#99D5C9" }}
  //                   >
  //                     Already have an account? Sign in
  //                   </Link>
  //                 </Grid>
  //               </Grid>
  //             </Box>
  //           </Box>
  //           <Copyright sx={{ mt: 5 }} />
  //         </Container>
  //       </ThemeProvider>
  //     );
  //   }
}
