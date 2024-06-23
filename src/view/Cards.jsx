import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import defaultImage from '../assets/images/noPic.jpg'
import './Cards.css'
import { jwtDecode } from 'jwt-decode'
import { formatDateString } from '../Utils/utils'
import MyCards from '../component/MyCards'

function Cards({ isLoggedIn, searchTerm, onSearch }) {
  const [cards, setCards] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [decodedToken, setDecodedToken] = useState({})

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      )
      const updatedCards = cards.filter((card) => card._id !== id)
      setCards(updatedCards)
    } catch (error) {
      console.error('Error deleting card:', error)
    }
  }

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards'
        )
        const data = response.data

        const cardsWithId = data.map((card) => ({
          ...card,
          id: card._id,
          liked: false,
        }))
        const token = localStorage.getItem('token')
        if (token) {
          setDecodedToken(jwtDecode(token))
        }
        setLoading(false)
        setCards(cardsWithId)
      } catch (error) {
        console.error('Error fetching cards:', error)
      }
    }
    fetchCards()
  }, [])

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const cardsToShow = isLoggedIn ? filteredCards : filteredCards.slice(0, 5)

  const handleSearch = (event) => {
    const searchTerm = event.target.value
    onSearch(searchTerm)
    navigate('/cards')
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center text-secondary">
        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const users = JSON.parse(localStorage.getItem('users')) || []
  const matchedCardsWithUsers = cardsToShow.map((card) => {
    const matchedUser = users.find((user) => user._id === card.user_id)
    if (matchedUser) {
      return {
        ...card,
        userName: `${matchedUser.name.first} ${matchedUser.name.last}`,
      }
    }
    return card
  })

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-3">
        <b style={{ fontFamily: 'cursive' }}>Cards</b>
      </h2>
      {isLoggedIn && (
        <form className="mt-4 mb-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search some cards..."
            aria-label="Search"
            onChange={handleSearch}
          />
        </form>
      )}

      <div className="row">
        <MyCards />
        {matchedCardsWithUsers.map((card) =>
          card === undefined ? null : (
            <div
              key={card.id}
              className="col-md-4 mb-4"
            >
              <div
                className="card"
                style={{ height: '500px' }}
              >
                {card.image && card.image.url ? (
                  <img
                    src={card.image.url}
                    alt={card.image.alt}
                    className="card-img-top"
                  />
                ) : (
                  <img
                    src={defaultImage}
                    alt="Default"
                    className="card-img-top"
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{card.title}</h3>
                  <small>{card.description}</small>
                  {users.length > 1 && (
                    <small> Created by : {card.userName}</small>
                  )}
                  <small>Created at : {formatDateString(card.createdAt)}</small>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    {isLoggedIn && (
                      <div>
                        <FaHeart color={card.liked ? 'red' : 'gray'} />
                        <span style={{ margin: '10px' }}>
                          {card.likes.length}
                        </span>
                      </div>
                    )}
                    {isLoggedIn && card.user_id === decodedToken._id && (
                      <>
                        <Link
                          to={`/edit-article/${card.id}`}
                          className="btn btn-link"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="btn btn-link"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                  <Link
                    to={`/article-details/${card.id}`}
                    className="btn btn-primary mt-3"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {!isLoggedIn && (
        <p className="text-center">Log in to see all cards and manage them.</p>
      )}
    </div>
  )
}

export default Cards
