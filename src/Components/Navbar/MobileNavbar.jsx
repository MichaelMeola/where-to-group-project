import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import "./MobileNavbar.css";

export default function MobileNavbar() {
  return (
    <Navbar expand="md" bg="light" data-bs-theme="navbar-main" fixed="top" className="mobile-navbar">
      <Container className="mobile-navbar-container">
        <Nav md={2} className="mobile-navbar-nav">
        </Nav>
        <Nav md={8} className="mobile-navbar-nav-logo">
            <>
            <Image 
                className="mobile-navbar-image-logo"
                src='../../pictures/whereto1.png'
                />
            </>
        </Nav>
        <Nav md={2} className="mobile-navbar-image-nav mobile-navbar-nav">
            <Link>
            <Image className='mobile-navbar-profilepic' src="https://i.redd.it/pg6qf2az8ma41.jpg" roundedCircle />
            </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
