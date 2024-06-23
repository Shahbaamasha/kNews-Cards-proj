import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaHeart, FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { formatDateString } from '../Utils/utils'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const MyCards = () => {
  const [cards, setCards] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [decodedToken, setDecodedToken] = useState({})

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('token')
        setDecodedToken(jwtDecode(token))
        const response = await axios.get(
          'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        )
        const data = response.data

        const cardsWithId = data.map((card) => ({
          ...card,
          id: card._id,
          liked: false,
        }))
        setLoading(false)
        setCards(cardsWithId)
      } catch (error) {
        console.error('Error fetching cards:', error)
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )

      const updatedCards = cards.filter((card) => card._id !== id)
      setCards(updatedCards)
    } catch (error) {
      console.error('Error deleting card:', error)
    }
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

  const matchedCardsWithUsers = cards.map((card) => {
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
      <div className="row">
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
                <img
                  src={card.image.url}
                  alt={card.image.alt}
                  className="card-img-top"
                />

                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{card.title}</h3>
                  <small>{card.description}</small>
                  <small>Created by : {card.userName}</small>
                  <small>Created at : {formatDateString(card.createdAt)}</small>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    {
                      <div>
                        <FaHeart color={card.liked ? 'red' : 'gray'} />
                        <span style={{ margin: '10px' }}>
                          {card.likes.length}
                        </span>
                      </div>
                    }
                    {card.user_id === decodedToken._id && (
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
                    to={{
                      pathname: `/article-details/${card.id}`,
                    }}
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
    </div>
  )
}

export default MyCards
