import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header({
  isLoggedIn,
  handleLogout,

  darkMode,
  toggleDarkMode,
}) {
  const navigate = useNavigate()

  return (
    <header
      className={`navbar navbar-expand-lg ${
        darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
      }`}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          <b style={{ fontFamily: 'cursive' }}>MY-CARDS</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul
            id="ul-nav"
            className="navbar-nav me-auto mb-2 mb-lg-0"
          >
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cards"
              >
                Cards
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/favorites"
                  >
                    Favorites
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/users"
                  >
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/my-cards"
                  >
                    My Cards
                  </Link>
                </li>
              </>
            )}
          </ul>
          {isLoggedIn && (
            <button
              className="btn btn-outline-success
              ms-3 me-3"
              onClick={() => navigate('/user/:id')}
            >
              {<FontAwesomeIcon icon={faUser} />}
            </button>
          )}

          <div className="buttons_container">
            {isLoggedIn ? (
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                className="btn btn-outline-success me-2"
                to="/login"
              >
                Login
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                className="btn btn-outline-primary"
                to="/signup"
              >
                Signup
              </Link>
            )}
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={toggleDarkMode}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
