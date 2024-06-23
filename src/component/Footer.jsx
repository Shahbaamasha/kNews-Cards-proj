import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

function Footer({ darkMode, isLoggedIn }) {
  return (
    <footer
      className={`footer mt-auto py-3 ${
        darkMode ? 'dark-mode' : ''
      } text-center`}
    >
      <nav>
        <ul className="footer-nav-list">
          <li>
            <NavLink
              exact
              to="/"
              activeclassname="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              activeclassname="active"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards"
              activeclassname="active"
            >
              Cards
            </NavLink>
          </li>
          <li>
            {isLoggedIn && (
              <NavLink
                to="/favorites"
                activeclassname="active"
              >
                Favorites
              </NavLink>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <NavLink
                to="/my-cards"
                activeclassname="active"
              >
                My Cards
              </NavLink>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <NavLink
                to="/users"
                activeclassname="active"
              >
                Users
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
      <div>&copy; {new Date().getFullYear()} kNews. All rights reserved.</div>
    </footer>
  )
}

export default Footer
