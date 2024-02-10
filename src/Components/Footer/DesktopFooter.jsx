import React from "react";
import "./DesktopFooter.css";

export default function DesktopFooter() {
  return (
    <footer className="font-small desktop-footer-style">
      <div className="">
        <div className="row desktop-row">
          <div className="col-md-3 mt-md-0 mt-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="/about">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mt-md-0 mt-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="/goal">
                  Our Goal
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="/team">
                  Our Team
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3 desktop-footer-links-div">
            <ul className="list-unstyled desktop-ul-link">
              <li>
                <a className="desktop-footer-link" href="/contact">
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
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
          {" "}
          MGR.COLLECTIVE
        </a>
      </div>
    </footer>
  );
}
