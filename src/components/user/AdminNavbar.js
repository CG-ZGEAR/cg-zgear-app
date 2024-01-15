import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ClipboardText, CalendarCheck } from "phosphor-react";

import "../../assets/css/navbar.css";

export const Navbar = () => {
 /* const storedToken = localStorage.getItem("accessToken");
  console.log(storedToken);*/

  return (
    <>
      <div className="navbar">
        <div className="links">
          <Link to={`/admin/active-users`} className="activeuser">
            <CalendarCheck size={46} />
            List <br />
            User
          </Link>

          <Link
            to={`/admin/fetch-deleted-users`}
            className="fetchfdeletedusers"
          >
            <ClipboardText size={46} />
            Deleted
            <br />
            Users
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
