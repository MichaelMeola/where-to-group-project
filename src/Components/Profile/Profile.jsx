import React from "react";
import { useProfileStore } from "../../globalState.jsx";
import Icon from "@mui/material/Icon";
import "./Profile.css";
import { Image } from "react-bootstrap";
import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import Container from "@mui/material/Container";

export default function Profile() {
  const { profile, setProfile } = useProfileStore();
  const [usernameValue, setUsernameValue] = useState(profile.username);
  const [passwordValue, setPasswordValue] = useState("");
  const [profilePicValue, setProfilePicValue] = useState(profile.profilePic);
  const [emailValue, setEmailValue] = useState(profile.email);
  const [ageValue, setAgeValue] = useState(profile.age);
  const [edit, setEdit] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [verifyPass, setVerifyPass] = useState("");
  const [newPassModal, setNewPassModal] = useState(false);
  // console.log(profile);
  // console.log(emailValue);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
    borderRadius: 3,
  };

  const theme = createTheme({
    typography: {
      fontSize: 13,
      display: "flex",
      flexDirection: "column",
    },
  });

  theme.typography.h3 = {
    color: "#ac00e6",
    padding: "5px 0px 5px 0px",

    fontSize: "1.2rem",
    display: "flex",
    flexDirection: "column",
  };
  theme.typography.p = {
    color: "black",
  };

  const ProfPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    elevation: "24",
    // maxWidth: "800",
    [theme.breakpoints.down("sm")]:{
      padding: 5,     
    },
  }));

  const ProfBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      // width: "60%",
      pb: "15px",
      pt: "5px",
      
      // backgroundColor: "blue",
    },
    [theme.breakpoints.up("md")]: {
      pb: "50px",
      minWidth: 600,
      maxWidth: 800,
    },
    "& > :not(style)": { width: "100%", minWidth: 300, maxWidth: 800 },
  }));

  const PurpSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: purple[600],
      "&:hover": {
        backgroundColor: alpha(purple[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: purple[600],
    },
  }));

  const PurpButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  let penI = (
    <Icon className="material-icons mobile-icons" sx={{ font_size: "medium" }}>
      edit_icon
    </Icon>
  );
  let data;

  const openEdit = () => {
    // console.log(data);
    setEdit(!edit);
    // console.log(edit);
  };

  const onEditProfile = async (e, data) => {
    setEdit(!edit);
    console.log(data);
    e.preventDefault();
    const res = await axios.post("/api/edit", data);
    if (res.data.success) {
      setProfile(res.data.profile);
      console.log("changes made: ", res.data.profile);
      setChangeModal(true);
    }
  };

  const verifyPassword = async (e, data) => {
    console.log("hit");
    e.preventDefault();
    const res = await axios.post("/api/verify", data);
    if (res.data.success) {
      console.log("verified");
      setPassModal(false);
      setNewPassModal(true);
    } else {
      alert(res.data.message);
    }
  };

  const newPassword = async (e, data) => {
    e.preventDefault();
    const res = await axios.post("/api/newPass", data);
    if (res.data.success) {
      // setProfile(res.data.profile);
      setNewPassModal(false);
    }
  };

  // console.log(usernameValue);
  if (!edit) {
    return (
        <Container sx={{pb: 25}}>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Edit Profile</Typography>
        <PurpSwitch onChange={openEdit} />
        <div>
          <Modal
            open={changeModal}
            onClose={() => setChangeModal(false)}
            // alignItems="center"
          >
            <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
              Changes successfully made to account
            </Box>
          </Modal>
          <Modal
            open={passModal}
            onClose={() => setPassModal(false)}
            // alignItems="center"
          >
            <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyPassword(
                    e,
                    (data = { password: verifyPass, userId: profile.userId })
                  );
                }}
              >
                <h2>Confirm password</h2>
                <input
                  type="password"
                  placeholder="Enter old password"
                  onChange={(e) => setVerifyPass(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </Box>
          </Modal>
          <Modal
            open={newPassModal}
            onClose={() => setNewPassModal(false)}
            // alignItems="center"
          >
            <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  newPassword(
                    e,
                    (data = { password: passwordValue, userId: profile.userId })
                  );
                }}
              >
                <h2>Password verified! Please enter new password</h2>
                <input
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </Box>
          </Modal>

          <ProfBox
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "20px",
              "& > :not(style)": { maxHeight: 1 / 3 },
            }}
          >
            <ProfPaper elevation={15}>
              <Image
                src={profilePicValue}
                className="profile-pic"
                roundedCircle
              />
              <Typography variant="h3" className="profile-template-text">
                Username:
              </Typography>
              <Typography
                variant="p"
                className="profile-username edit-hover"
                onClick={() => openEdit()}
              >
                {usernameValue}
              </Typography>
            </ProfPaper>
          </ProfBox>
          <ProfBox>
            <ProfPaper elevation={15}>
              <Typography variant="h3">Email:</Typography>
              <Typography variant="p">{emailValue}</Typography>
              <Typography variant="h3">Age:</Typography>
              <Typography variant="p">{ageValue}</Typography>
              <Typography variant="h3">Password:</Typography>
              <Typography
                className="edit-hover"
                onClick={() => setPassModal(true)}
              >
                ********{penI}
              </Typography>
            </ProfPaper>
          </ProfBox>
        </div>
      </ThemeProvider>
      </Container>
    );
  } else {
    return (
      <>
      <Container sx={{pb: 17}}>
        <ThemeProvider theme={theme}>
        <Typography variant="h3">Edit Profile</Typography>
          <PurpSwitch onChange={openEdit} defaultChecked />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEditProfile(
                e,
                (data = {
                  username: usernameValue,
                  profilePic: profilePicValue,
                  email: emailValue,
                  age: ageValue,
                  userId: profile.userId,
                })
              );
            }}
          >
            <Modal
              open={changeModal}
              onClose={() => setChangeModal(false)}
              // alignItems="center"
            >
              <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
                Changes successfully made to account
              </Box>
            </Modal>
            <Modal
              open={passModal}
              onClose={() => setPassModal(false)}
              // alignItems="center"
            >
              <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    verifyPassword(
                      e,
                      (data = { password: verifyPass, userId: profile.userId })
                    );
                  }}
                >
                  <h2>Confirm password</h2>
                  <input
                    type="password"
                    placeholder="Enter old password"
                    onChange={(e) => setVerifyPass(e.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
              </Box>
            </Modal>
            <Modal
              open={newPassModal}
              onClose={() => setNewPassModal(false)}
              // alignItems="center"
            >
              <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    newPassword(
                      e,
                      (data = {
                        password: passwordValue,
                        userId: profile.userId,
                      })
                    );
                  }}
                >
                  <h2>Password verified! Please enter new password</h2>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
              </Box>
            </Modal>

            <ProfBox
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: "20px",
                "& > :not(style)": { width: "100%", maxHeight: 1 / 3 },
              }}
            >
              <PurpButton type="submit">Save</PurpButton>
              <ProfPaper elevation={15}>
                <Image
                  src={profilePicValue}
                  className="profile-pic"
                  roundedCircle
                />
                <TextField
                  value={profilePicValue}
                  onChange={(e) => setProfilePicValue(e.target.value)}
                />
                <Typography variant="h3" className="profile-template-text">
                  Username:
                </Typography>
                <TextField
                  value={usernameValue}
                  onChange={(e) => setUsernameValue(e.target.value)}
                />
              </ProfPaper>
            </ProfBox>
            <ProfBox>
              <ProfPaper elevation={15}>
                <Typography variant="h3">Email:</Typography>
                <TextField
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                <Typography variant="h3">Age:</Typography>
                <TextField
                  value={ageValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                <Typography variant="h3">Password:</Typography>
                <Typography
                  className="edit-hover"
                  onClick={() => setPassModal(true)}
                >
                  ********{penI}
                </Typography>
              </ProfPaper>
            </ProfBox>
          </form>
        </ThemeProvider>
        </Container>
        {/* <ThemeProvider theme={theme}>
      <Switch onChange={openEdit}/>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditProfile(
              e,
              (data = {
                username: usernameValue,
                // password: passwordValue,
                profilePic: profilePicValue,
                email: emailValue,
                age: ageValue,
                userId: profile.userId,
              })
            );
          }}
        >
          <div className="profile-img-card">
            <button type="submit">Save</button>
            <Image
              src={profilePicValue}
              className="profile-pic"
              roundedCircle
            />
            <input value={profilePicValue} onChange={(e) => setProfilePicValue(e.target.value)} />
            <p className="profile-template-text">Username:</p>
            <input
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
            />
          </div>
          <div className="profile-info-card">
            <p className="profile-template-text">Email:</p>
            <input
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <p className="profile-template-text">Age:</p>
            <input
              value={ageValue}
              onChange={(e) => setAgeValue(e.target.value)}
            />
            <p className="profile-template-text">Password:</p>
            <h4 className="edit-hover">********{penI}</h4>
          </div>
        </form>
      </ThemeProvider> */}
      </>
    );
  }
}
