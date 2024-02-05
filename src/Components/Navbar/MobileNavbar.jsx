import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileNavbar.css";
import { useProfileStore } from "../../globalState.jsx";
import axios from "axios";

export default function MobileNavbar() {
  const navigate = useNavigate();
  const { profile, logout } = useProfileStore();
  const [show, setShow] = useState(false);
  const userId = sessionStorage.getItem("userId");
  let dropDown = null;

  // useEffect(() => {
  //   if (!userId) {
  //     navigate("/")
  //   }
  // },[])

  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((response) => {
        console.log(response.data.message);
        logout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (show) {
    dropDown = (
      <div className="dropdown-parent">
        <div className="dropdown-items">
          <Link className="dropdown-username">@{profile.username}</Link>
        </div>
        <div className="dropdown-items">
          <Link to="/profile" className="dropdown-link">
            Settings
          </Link>
        </div>
        <div className="dropdown-items">
          <Link onClick={handleLogout} className="dropdown-link">
            Logout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        expand="md"
        data-bs-theme="navbar-main"
        fixed="top"
        className="mobile-navbar"
      >
        <Container className="mobile-navbar-container">
          <Nav md={2} className="mobile-navbar-nav"></Nav>
          <Nav md={8} className="mobile-navbar-nav-logo">
            <figure className="mobile-navbar-figure">
              <Image
                className="mobile-navbar-image-logo"
                src="../../pictures/whereto1.png"
              />
            </figure>
          </Nav>
          <Nav md={2} className="mobile-navbar-image-nav mobile-navbar-nav"></Nav>
        </Container>
      </Navbar>
      <div className="dropdown-div">
        <Image
          className="profilePic"
          src={profile.profilePic}
          onClick={() => setShow(!show)}
          roundedCircle
        />
        {dropDown}
      </div>
    </>
  );
}