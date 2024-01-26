import React from "react";
import { Link } from 'react-router-dom'
import './MobileFooter.css'


export default function MobileFooter() {
  return (
    <footer className="mobile-page-footer font-small footer-style" style={{ backgroundColor: 'white', padding: '0px 0px 0px 0px'}}>
      <div className="text-center m-auto">
        <div className="row" >
          <div className="col-4 m-auto">
            <Link to="/events">
            <i className="material-icons mobile-icons">home</i>
            </Link>
          </div>
          <div className="col-4 m-auto">
            <Link to="/search">
            <i className="material-icons mobile-icons">search</i>
            </Link>
          </div>
          <div className="col-4 m-auto">
            <Link to="/myCalendar">
            <i className="material-icons mobile-icons">calendar_month</i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
