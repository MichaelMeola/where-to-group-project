import React from "react";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./DesktopNavbar.css";
import { useProfileStore } from "../../globalState.jsx";

export default function DesktopNavbar() {
  const { profile } = useProfileStore();

  return (
    <Navbar
      expand="md"
      data-bs-theme="light"
      fixed="top"
      className="desktop-navbar-main"
    >
      <Container fluid>
        <Navbar.Brand className="desktop-navbar-brand-link">
          <Link to="/events" className="desktop-nav-link">
            <figure>
              <img
                src="../../pictures/whereto1.png"
                className="desktop-navbar-brank-img"
              />
            </figure>
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/events" className="desktop-nav-link desktop-nav-link-link">
            Events
          </Link>
          <Link to="/create" className="desktop-nav-link desktop-nav-link-link">
            Create
          </Link>
          <Link to="/myCalendar" className="desktop-nav-link desktop-nav-link-link">
            Calendar
          </Link>
        </Nav>
        <Nav className="ms-auto">
          <Link to="/profile" className="desktop-nav-link-profile-pic">
            <Image
              className="desktop-navbar-profilepic"
              src={`${profile.profilePic}`}
              roundedCircle
            />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
