import React from "react";
import { Link } from 'react-router-dom'
import './MobileFooter.css'


export default function MobileFooter() {
  return (
    <footer className="page-footer font-small blue pt-4 footer-style" style={{ backgroundColor: 'white', padding: '0px 0px 0px 0px'}}>
      <div className="text-center m-auto">
        <div className="row" >
          <div className="col-4 m-auto">
            <Link to="/">
            <i className="material-icons cart-icon">home</i>
            </Link>
          </div>
          <div className="col-4 m-auto">
            <Link to="/">
            <i className="material-icons cart-icon">search</i>
            </Link>
          </div>
          <div className="col-4 m-auto">
            <Link to="/">
            <i className="material-icons cart-icon">group</i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
