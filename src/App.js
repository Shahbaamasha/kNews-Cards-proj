
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import About from './view/About'
import Login from './view/Login'
import Signup from './view/Signup'
import CreateCard from './view/CreateCard'
import EditArticle from './view/EditArticle'
import Home from './view/Home'
import Favorites from './view/Favorites'
import Cards from './view/Cards'
import Users from './view/Users'
import CreateUser from './view/CreateUser'
import EditUser from './view/EditUser'
import ArticleCard from './view/ArticleCard'
import UsersDetails from './view/UsersDetails'
import FavoriteDetails from './view/FavoritesDetails'
import { jwtDecode } from 'jwt-decode'
import UserPage from './view/UserPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
/*import MyCards from './component/MyCards'*/
import MyCardsPage from './view/MyCardsPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(savedTheme === 'true')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setIsAdmin(decodedToken.isAdmin)
        setIsLoggedIn(true)
        setUserId(decodedToken._id)
      } catch (error) {
        console.error('Failed to decode token:', error)
        localStorage.removeItem('token')
      }
    }
  }, [])
  const handleLogin = (token) => {
    try {
      const decodedToken = jwtDecode(token)

      setIsAdmin(decodedToken.isAdmin)
      setIsLoggedIn(true)
      setUserId(decodedToken._id)
    } catch (error) {
      console.error('Failed to decode token:', error)
      localStorage.removeItem('token')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setUserId(null)
    localStorage.removeItem('token')
  }

  return (
    <Router>
      <div className={ `app ${darkMode ? 'dark-mode' : ''}` }>
        <Header
          isLoggedIn={ isLoggedIn }
          handleLogout={ handleLogout }
          darkMode={ darkMode }
          toggleDarkMode={ toggleDarkMode }
        />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/my-cards" element={ <MyCardsPage /> } />
          <Route path="/login" element={ <Login onLogin={ handleLogin } /> } />
          <Route path="/signup" element={ <Signup onSignup={ handleLogin } /> } />
          <Route path="/create-user" element={ <CreateUser isAdmin={ isAdmin } /> } />
          <Route path="/create-article" element={ isLoggedIn ? <CreateCard /> : <Navigate to="/login" /> } />
          <Route path="/cards" element={ <Cards searchTerm={ searchTerm } isLoggedIn={ isLoggedIn } onSearch={ setSearchTerm } /> } />
          <Route path="/users" element={ <Users isAdmin={ isAdmin } /> } />
          <Route path="/favorites" element={ isLoggedIn ? <Favorites isLoggedIn={ isLoggedIn } /> : <Navigate to="/login" /> } />
          <Route path="/article-details/:id" element={ <ArticleCard isLoggedIn={ isLoggedIn } /> } />
          <Route path="/user/:id" element={ <UserPage isAdmin={ isAdmin } userId={ userId } /> } />
          <Route path="/users/:userId" element={ <UsersDetails /> } />
          <Route path="/favorite-details/:id" element={ <FavoriteDetails /> } />
          <Route path="/edit-article/:id" element={ isLoggedIn ? <EditArticle /> : <Navigate to="/login" /> } />
          <Route path="/edit-user/:id" element={ <EditUser isAdmin={ isAdmin } /> } />
        </Routes>
        <Footer darkMode={ darkMode } isLoggedIn={ isLoggedIn } />
      </div>
    </Router>
  )
}

export default App
