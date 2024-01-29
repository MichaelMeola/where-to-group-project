import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import "./MobileNavbar.css";
import { useProfileStore } from "../../globalState.jsx";
import { useState } from "react";

export default function MobileNavbar() {
  const { profile, logout } = useProfileStore();
  const [show, setShow] = useState(false);
  let dropDown = null;
  
  console.log(show);
  console.log(dropDown);
  if(show){
     dropDown = (
      <div className="dropdown-parent">
        <div className="dropdown-items">
          <Link className="dropdown-username">
            @{profile.username}
          </Link>
        </div>
        <div className="dropdown-items">
          <Link to="/profile" className="dropdown-link">
            Settings
          </Link>
        </div>
        <div className="dropdown-items">
          <Link onClick={logout} className="dropdown-link">
            Logout
          </Link>
        </div>
      </div>
    )
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
        <Nav md={2} className="mobile-navbar-image-nav mobile-navbar-nav">
        </Nav>
      </Container>
    </Navbar>
          <div className="dropdown-div">
              <Image
                className="mobile-navbar-profilepic"
                src={profile.profilePic}
                onClick={() => setShow(!show)}
                roundedCircle

              />
              {dropDown}
          </div>
          </>
  );
  }
