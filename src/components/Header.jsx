import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const isLoggedIn = localStorage.getItem("userData");
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">

        <NavLink to="/" className="navbar-brand text-white">
          Electricity Board
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <NavLink to="/" className="nav-link text-white">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/StatisticsCollection" className="nav-link text-white">
                Dashboard Statistics
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
              <NavLink to="/logout" className="nav-link text-white">
                Logout
              </NavLink>
              </li>
            ) : (
              <li className="nav-item">
              <NavLink to="/login" className="nav-link text-white">
                Login
              </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
