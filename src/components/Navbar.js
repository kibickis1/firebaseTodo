import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-full">
      <div className="navbar">
        <ul>
          {/* <li>
            https://www.behance.net/gallery/159632283/Task-Management-Mobile-App?tracking_source=search_projects|todo+list+app
          </li> */}
          <li>
            <Link to="/">
              <button className="home-page-button">Home page</button>
            </Link>
          </li>
          <Link to="/submission">
            <button className="submission-form-button">+ Add New</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
