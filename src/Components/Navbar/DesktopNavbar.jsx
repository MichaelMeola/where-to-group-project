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
      bg="light"
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
                style={{ width: "200px" }}
              />
            </figure>
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/events" className="desktop-nav-link desktop-nav-link-link">
            Events
          </Link>
          <Link to="/myCalendar" className="desktop-nav-link desktop-nav-link-link">
            Calendar
          </Link>
          <Link to="/search" className="desktop-nav-link">
            <i className="material-icons desktop-nav-link-search-icon">
              search
            </i>
          </Link>
        </Nav>
        <Nav className="ms-auto">
          <Link to="/profile" className="desktop-nav-link-profile-pic">
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
