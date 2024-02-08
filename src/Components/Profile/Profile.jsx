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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";


const style = {
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  width: 200,
  padding: 5,
  borderRadius: 5,
  textAlign: "center",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#bf00ff",
    },
    secondary: {
      main: "#ac00e6",
    },
    background: {
      main: "#99D5C9",
    },
  },
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

const CustomTextField = styled(TextField)(({ theme }) => ({
  padding: "7px 0px 7px 0px",
}));
// theme.typography.h2 = {
//   color: "black",

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
  [theme.breakpoints.down("sm")]: {
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
const ProfEditBtn = styled(IconButton)(({ theme }) => ({
  color: "black",
  backgroundColor: "white",
  borderRadius: 5,
  padding: -5,
  "&:hover": {
    backgroundColor: purple[700],
    borderRadius: 5,
    color: "white",
  },
}));

const PurpButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  borderRadious: 0,
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const DisabledPurpButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[200]),
  backgroundColor: purple[200],
  "&:hover": {
    backgroundColor: purple[200],
  },
}));

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
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [verifyAlert, setVerifyAlert] = useState(false);
  const [verifyFail, setVerifyFail] = useState(false);
  const [deleteVerifyModal, setDeleteVerifyModal] = useState(false);
  const [verified, setVerified] = useState(false);

  let navigate = useNavigate();

 
  
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
    if (res.data.passCheck) {
      alert(res.data.message);
    }
  };

  const verifyPassword = async (e, data) => {
    console.log("hit");
    e.preventDefault();
    const res = await axios.post("/api/verify", data);
    console.log(res.data);
    if (res.data.success) {
      console.log("verified");

      setNewPassModal(true);
    } else if (res.data.passCheck) {
      setVerifyAlert(true);
      setPassModal(true);
      setVerifyFail(false);
      console.log(verifyFail);
    } else {
      setVerifyFail(true);
      setVerifyAlert(false);
      console.log(verifyFail);
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

  const verifyPasswordDelete = async (e, data) => {
    console.log("hit");
    e.preventDefault();
    const res = await axios.post("/api/verify", data);
    console.log(res.data);

    if (res.data.passCheck) {
      deleteAccount(e, data);
      // logout();
      // setVerifyAlert(true);
    } else {
      setVerifyFail(true);
      setVerifyAlert(false);
      console.log(verifyFail);
    }
  };

  const deleteAccount = async (e, data) => {
    e.preventDefault();
    const res = await axios.delete(`/api/delete/${profile.userId}`, data);
    if (res.data.success) {
      setDeleteVerifyModal(false);
      setDeleteAlert(true);
      console.log("account deleted");
      // navigate("/");
    } else {
      alert(res.data.message);
    }
  };

  if (!edit) {
    return (
      <Container sx={{ pb: 25 }}>
        <ThemeProvider theme={theme}>
          <Typography variant="h3">Edit Profile</Typography>
          <PurpSwitch onChange={openEdit} />
          <div>
            <Modal
              open={deleteAlert}
              onClose={() => {
                navigate("/"), setDeleteAlert(false);
              }}
            >
              <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
                Account successfully deleted, redirecting to login...
              </Box>
            </Modal>
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
              sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={passModal}
              onClose={() => {
                setPassModal(false),
                  setVerifyFail(false),
                  setVerifyAlert(false);
              }}
              // alignItems="center"
            >
              <Box className="modal-success" sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              padding: 5,
              width: 1 / 2,
              borderRadius: 5,
              textAlign: "center",
              }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    verifyPassword(
                      e,
                      (data = { password: verifyPass, userId: profile.userId })
                    );
                  }}
                >
                  <h2>Enter current password</h2>
                  <input
                    type="password"
                    placeholder="Enter old password"
                    onChange={(e) => setVerifyPass(e.target.value)}
                  />
                  {verifyAlert && (
                    <Alert severity="info">
                      <AlertTitle>Success</AlertTitle>Password Verified, create
                      new password
                    </Alert>
                  )}
                  {!verifyAlert && <button type="submit">Submit</button>}
                  {verifyAlert && (
                    <button
                      type="submit"
                      onClick={() => setNewPassModal(!newPassModal)}
                    >
                      Create new password
                    </button>
                  )}
                  {verifyFail ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>Incorrect password
                    </Alert>
                  ) : (
                    ""
                  )}
                  {/* {!verifyFail && ""} */}
                </form>
              </Box>
            </Modal>


            <Modal
            sx={{ 
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
              open={newPassModal}
              onClose={() => setNewPassModal(false)}
              // alignItems="center"
            >
              <Box className="modal-success" sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              padding: 5,
              width: 1 / 2,
              borderRadius: 5,
              textAlign: "center",
              }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setChangeModal(true);
                    setPassModal(false);
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
                    required
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                  <button type="submit" sx={{bgcolor: "white"}}>Submit</button>
                </form>
              </Box>
            </Modal>
            <Modal
              open={deleteVerifyModal}
              onClose={() => {
                setDeleteVerifyModal(false), setVerifyFail(false);
              }}

              // alignItems="center"
            >
              <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    verifyPasswordDelete(
                      e,
                      (data = {
                        password: verifyPass,
                        userId: profile.userId,
                      })
                    );
                  }}
                >
                  <h2>To delete account, confirm password</h2>
                  <input
                    type="password"
                    placeholder="Enter old password"
                    onChange={(e) => setVerifyPass(e.target.value)}
                  />
                  {!verifyAlert && <button type="submit">Submit</button>}
                  {verifyFail ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>Incorrect password
                    </Alert>
                  ) : (
                    ""
                  )}
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

                <Typography variant="h3">Username:</Typography>
                <Typography variant="p" onClick={() => openEdit()}>
                  {usernameValue}
                </Typography>
              </ProfPaper>
            </ProfBox>
            <ProfBox>
              <ProfPaper elevation={15}>
                <Typography variant="h3">Email:</Typography>
                <Typography variant="p">{emailValue}</Typography>
                <Typography variant="h3">Age:</Typography>
                {!ageValue && (
                  <Typography variant="p" sx={{ color: "grey" }}>
                    Enter age
                  </Typography>
                )}
                <Typography variant="p">{ageValue}</Typography>
                <Typography variant="h3" label="">
                  Password:
                </Typography>
                <ProfEditBtn
                  onClick={() => {
                    setPassModal(true),
                      setVerifyAlert(false),
                      setVerifyFail(false);
                  }}
                >
                  *****
                  <EditIcon />
                </ProfEditBtn>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteVerifyModal(true)}
                  color="error"
                >
                  Delete Account
                </Button>
              </ProfPaper>
            </ProfBox>
          </div>
        </ThemeProvider>
      </Container>
    );
  } else {
    return (
      <>
        <Container sx={{ pb: 17 }}>
          <ThemeProvider theme={theme}>
            <Typography variant="h3">Edit Profile</Typography>
            <PurpSwitch onChange={openEdit} checked />
            <Box
              component="form"
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
                open={deleteAlert}
                onClose={() => {
                  navigate("/"), setDeleteAlert(false);
                }}
              >
                <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
                  Account successfully deleted, redirecting to login...
                </Box>
              </Modal>
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
              open={deleteVerifyModal}
              onClose={() => {
                setDeleteVerifyModal(false), setVerifyFail(false);
              }}

              // alignItems="center"
            >
              <Box className="modal-success" sx={{ ...style, width: 1 / 2 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    verifyPasswordDelete(
                      e,
                      (data = {
                        password: verifyPass,
                        userId: profile.userId,
                      })
                    );
                  }}
                >
                  <h2>To delete account, confirm password</h2>
                  <input
                    type="password"
                    placeholder="Enter old password"
                    required
                    onChange={(e) => setVerifyPass(e.target.value)}
                  />
                  {!verifyAlert && <button type="submit">Submit</button>}
                  {verifyFail ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>Incorrect password
                    </Alert>
                  ) : (
                    ""
                  )}
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
                      e.stopPropagation();
                      setChangeModal(true);
                      setPassModal(false);
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
                      required
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
                {/* {!error ? <PurpButton type="submit">Save</PurpButton> : ""} */}
                {profilePicValue.length > 3 &&
                  usernameValue.length >= 3 &&
                  emailValue.length > 3 &&
                   <PurpButton type="submit">Save</PurpButton>}
                {(profilePicValue.length <= 3 ||
                  usernameValue.length <= 2 ||
                  emailValue.length <= 3) && (
                  <DisabledPurpButton disabled type="submit">
                    Save
                  </DisabledPurpButton>
                )}

                <ProfPaper elevation={15}>
                  <Image
                    src={profilePicValue}
                    className="profile-pic"
                    roundedCircle
                  />

                  <CustomTextField
                    color="primary"
                    label="URL"
                    error={!profilePicValue}
                    helperText={
                      !profilePicValue ? "Profile image link requried" : ""
                    }
                    value={profilePicValue}
                    onChange={(e) => {
                      console.log("profpic change " + profilePicValue);
                      setProfilePicValue(e.target.value);
                    }}
                  />

                  {/* <Typography variant="h3" className="profile-template-text" label="username">
                                          Username:
                                        </Typography> */}
                  <CustomTextField
                    label="Username"
                    error={!usernameValue || usernameValue.length < 3}
                    helperText={
                      !usernameValue
                        ? "Username required"
                        : usernameValue.length < 3
                        ? "Username must be at least 3 characters long"
                        : ""
                    }
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                    required
                  />
                </ProfPaper>
              </ProfBox>
              <ProfBox>
                <ProfPaper elevation={15}>
                  {/* <Typography variant="h3" label="email">Email:</Typography> */}
                  <CustomTextField
                    label="Email"
                    type="email"
                    error={!emailValue}
                    helperText={!emailValue ? "Email required" : ""}
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    required
                  />
                  {/* <Typography label ="age" variant="h3">Age:</Typography> */}
                  <CustomTextField
                    label="Age"
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    required
                  />
                  <Typography variant="h3" label="password">
                    Password:
                  </Typography>
                  <ProfEditBtn
                    onClick={() => {
                      setPassModal(true),
                        setVerifyAlert(false),
                        setVerifyFail(false);
                    }}
                  >
                    *****
                    <EditIcon />
                  </ProfEditBtn>
                  <Button startIcon={<DeleteIcon />} color="error">
                    Delete Account
                  </Button>
                </ProfPaper>
              </ProfBox>
            </Box>
          </ThemeProvider>
        </Container>
      </>
    );
  }
}
