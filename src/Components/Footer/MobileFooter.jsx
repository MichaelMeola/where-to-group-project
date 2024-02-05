import React from "react";
import { Link } from "react-router-dom";
import "./MobileFooter.css";
import { useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function MobileFooter() {
  const location = useLocation();

  return (
    <footer
      className="mobile-page-footer font-small footer-style"
      style={{
        backgroundColor: "white",
        padding: "0px 0px 0px 0px",
        zIndex: "1",
      }}
    >
      <div className="text-center m-auto">
        <div className="row">
          <div className="col-4 m-auto">
            <Link to="/events">
              {location.pathname === "/events" ? (
                <i className="material-icons mobile-icons" style={{ color: '#9200e0'}}>home</i> 
              ) : (
                <i
                  className="material-icons mobile-icons"
                >
                 home
                </i> 
              )}
            </Link>
          </div>
          <div className="col-4 m-auto">
            <Link to='/create'>
              {location.pathname === '/create' ? (
                <i className='material-icons mobile-icons' style={{ color: '#9200e0'}}>add</i>
              ) : (
                <i className='material-icons mobile-icons' >add</i>
              )}
            </Link>
          </div>
          <div className="col-4 m-auto">
            <Link to="/myCalendar">
              {location.pathname === '/myCalendar' ? (
                <i className="material-icons mobile-icons" style={{ color: '#9200e0'}}>calendar_month</i>
              ) : (
                <i className="material-icons mobile-icons">calendar_month</i>
              )}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
