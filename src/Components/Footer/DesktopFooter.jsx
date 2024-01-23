import React from "react";
import "./DesktopFooter.css";

export default function DesktopFooter() {
  return (
    <footer className="page-footer font-small blue pt-4 desktop-footer-style">
      <div className="container-fluid text-center text-md-left">
        <div className="row desktop-row">
          <div className="col-md-3 mt-md-0 mt-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="#!">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mt-md-0 mt-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="#!">
                  Our Goal
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="/qa">
                  Our Team
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="/admin">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3 copyright-div">
        © 2024 Copyright:
        <a
          className="desktop-footer-link"
          href="https://www.linkedin.com/in/richard-webber-b1a052276/"
        >
          {" "}
          MGR.LLC
        </a>
      </div>
    </footer>
  );
}
