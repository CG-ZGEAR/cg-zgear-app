import React from "react";
import { Link } from "react-router-dom";
import { ClipboardText, CalendarCheck } from "phosphor-react";
import "../../assets/css/navbar.css"
export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/active-users" className="activeUser">
          <CalendarCheck size={46} />
          List <br></br>
          User
        </Link>


        <Link to="/fetch-deleted-users" className="FetchDeletedUsers">
          <ClipboardText size={46} />
          Deleted<br></br>
          Users
        </Link>
      </div>
    </div>
  );
};
export default Navbar;