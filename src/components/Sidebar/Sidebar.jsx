import React, { useEffect, useRef, useState } from "react";
import "./sidebar.scss";

import { MdHomeRepairService, MdDashboard } from "react-icons/md";
import { AiFillFileAdd, AiFillDatabase } from "react-icons/ai";

import { CgLogOut } from "react-icons/cg";
import SidebarNavlink from "../SidebarLink/SidebarNavlink";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/userSlice";
import AppService from "../../APIServices/AppAPI";

function Sidebar() {
  const [activeLink, setActiveLink] = useState(
    "/" + window.location.pathname.split("/")[1]
  );
  const { position } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHandle() {
    await AppService.logout();
    dispatch(logout());
    window.localStorage.removeItem("user");
    navigate("/");
  }

  useEffect(() => {
    setActiveLink("/" + window.location.pathname.split("/")[1]);
  }, [window.location.pathname]);

  const [locatinPath, setLocaintPath] = useState(
    window.location.pathname.split("/")[1]
  );

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      dispatch(login(currentUser));
    }
    if (
      currentUser.position !== "admin" &&
      ["waitingList", "tables", "-$tables", "dashboard"].includes(locatinPath)
    ) {
      alert("You don't have permission to access these data");
      navigate("/");
    }
  }, []);

  return (
    <div className="sidebar">
      <Link to="/" className="link">
        <div
          className="sidebar_logo"
          onClick={() => setActiveLink("Prepare Service")}
        >
          <img src="https://drive.google.com/uc?export=view&id=1yXnO4PKN80LeThvLlG4DDrR0lRw6al1A" alt="drive image"/>
          <div className="sidebar_logo_letter">
            <h1>Nice</h1>
            <p>Car workshop</p>
          </div>
        </div>
      </Link>

      <hr></hr>
      <div className="sidebar_navlinks">
        <h2>Service</h2>
        <SidebarNavlink
          Icon={AiFillFileAdd}
          linkName="Prepare Service"
          windowLoactinPath={activeLink}
          path="/"
        />
        <SidebarNavlink
          Icon={MdHomeRepairService}
          linkName="Services"
          windowLoactinPath={activeLink}
          path="/services"
        />
        <SidebarNavlink
          Icon={MdHomeRepairService}
          linkName="Services Status"
          windowLoactinPath={activeLink}
          path="/serviceStatus"
        />
        {position === "admin" && (
          <>
            <h2>Lists</h2>
            <SidebarNavlink
              Icon={AiFillDatabase}
              linkName="Waiting List"
              windowLoactinPath={activeLink}
              path="/waitingList"
            />
            <SidebarNavlink
              Icon={AiFillDatabase}
              linkName="Tables"
              windowLoactinPath={activeLink}
              path="/tables"
            />
            <SidebarNavlink
              Icon={AiFillDatabase}
              linkName="Tables -$"
              windowLoactinPath={activeLink}
              path="/-$tables"
            />
            <SidebarNavlink
              Icon={MdDashboard}
              linkName="Dashboard"
              windowLoactinPath={activeLink}
              path="/dashboard"
            />
          </>
        )}

        <h2>USERS</h2>
        <SidebarNavlink
          Icon={CgLogOut}
          linkName="Logout"
          windowLoactinPath={activeLink}
          logoutFunc={logoutHandle}
        />
      </div>
    </div>
  );
}

export default Sidebar;
