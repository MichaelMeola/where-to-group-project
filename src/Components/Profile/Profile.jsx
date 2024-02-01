import React from "react";
import { useProfileStore } from "../../globalState.jsx";
import Icon from "@mui/material/Icon";
import "./Profile.css";
import { Image } from "react-bootstrap";
// import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
  let you = "You";
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
    console.log('hit');
    e.preventDefault();
    const res = await axios.post("/api/verify", data);
    if (res.data.success) {
      console.log('verified');
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
  }

  // console.log(usernameValue);
  if (!edit) {
    return (
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
                verifyPassword(e, 
                  (data = { password: verifyPass, userId: profile.userId})
                )
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
                newPassword(e, 
                  (data = { password: passwordValue, userId: profile.userId})
                )
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
        <>
          <div className="profile-img-card">
            <Image
              src={profile.profilePic}
              className="profile-pic"
              roundedCircle
            />
            <p className="profile-template-text">Username:</p>
            <h4
              className="profile-username edit-hover"
              onClick={() => openEdit()}
            >
              {usernameValue}
              {penI}
            </h4>
          </div>
          <div className="profile-info-card">
            <p className="profile-template-text">Email:</p>
            <h4 className="edit-hover" onClick={() => openEdit()}>
              {emailValue}
              {penI}
            </h4>
            <p className="profile-template-text">Age:</p>
            <h4 className="edit-hover" onClick={() => openEdit()}>
              {ageValue}
              {penI}
            </h4>
            <p className="profile-template-text">Password:</p>
            <h4 className="edit-hover" onClick={() => setPassModal(true)}>
              ********{penI}
            </h4>
          </div>
        </>
      </div>
    );
  } else {
    return (
      <>
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
              src={profile.profilePic}
              className="profile-pic"
              roundedCircle
            />
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
      </>
    );
  }
}
