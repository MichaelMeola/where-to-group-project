import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import "./MobileNavbar.css";
import { useProfileStore } from "../../globalState.jsx";

export default function MobileNavbar() {
  const { profile } = useProfileStore();

  return (
    <Navbar
      expand="md"
      bg="light"
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
          <Link to='/profile'>
            <Image
              className="mobile-navbar-profilepic"
              src={`${profile.profilePic}`}
              roundedCircle
            />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
