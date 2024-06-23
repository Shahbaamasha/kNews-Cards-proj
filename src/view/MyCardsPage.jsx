import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaHeart, FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { formatDateString } from '../Utils/utils'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import MyCards from '../component/MyCards'

const MyCardsPage = () => {
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

  const addCard = () => {
    navigate('/create-article') // Redirect to the CreateArticle page
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mt-4 mb-3">
          <b style={{ fontFamily: 'cursive' }}>My Cards</b>
        </h2>
        <button
          onClick={addCard}
          className="btn btn-primary mb-3"
        >
          <FaPlus /> Create Card
        </button>
        <MyCards />
      </div>
    </div>
  )
}

export default MyCardsPage
