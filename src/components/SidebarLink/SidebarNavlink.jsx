import React from "react";
import "./sidebarNavlink.scss";
import { Link } from "react-router-dom";

function SidebarNavlink({
  Icon,
  linkName,
  activeLink,
  windowLoactinPath,
  path,
  logoutFunc,
}) {
  return (
    <>
      {path ? (
        <Link to={`${path}`} className="link">
          <div
            className={
              path === windowLoactinPath
                ? "sidebar_navlink active"
                : "sidebar_navlink"
            }
          >
            <Icon className="sidebar_icon" />
            <p>{linkName}</p>
          </div>
        </Link>
      ) : (
        <div
          onClick={() => {
            logoutFunc();
          }}
          className={
            activeLink === linkName
              ? "sidebar_navlink active"
              : "sidebar_navlink"
          }
        >
          <Icon
            className="sidebar_icon"
            style={{ stroke: "url(#blue-gradient)" }}
          />
          <p>{linkName}</p>
        </div>
      )}
    </>
  );
}

export default SidebarNavlink;
