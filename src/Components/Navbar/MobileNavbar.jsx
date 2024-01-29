import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import "./MobileNavbar.css";
import { useProfileStore } from "../../globalState.jsx";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { useNavigate } from "react-router-dom";

export default function MobileNavbar() {
  const { profile, logout } = useProfileStore();

  const customToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
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
        <Dropdown className="mobile-navbar-dropdown">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="desktop-navbar-dropdown-toggle"
              as={customToggle}
            >
              <a>
                <Image
                className="desktop-navbar-profilepic"
                src={`${profile.profilePic}`}
                roundedCircle
                />
              </a>
            </Dropdown.Toggle>

            <DropdownMenu
              align="end"
              className="desktop-navbar-dropdown-menu-left"
            >
              <Dropdown.Header className="desktop-navbar-dropdown-header">
                @{profile.username}
              </Dropdown.Header>
              <Dropdown.Item align="start" href="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Item href="/" onClick={logout}>
                Logout
              </Dropdown.Item>
            </DropdownMenu> 

           </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
  }
