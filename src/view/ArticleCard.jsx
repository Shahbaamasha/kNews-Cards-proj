import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import './ArticleCard.css'
import { FaGlobe, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa'

function ArticleCard({ isLoggedIn }) {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [isLocal, setIsLocal] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const formData = JSON.parse(localStorage.getItem('formData')) || []
        const localArticle = formData.find((card) => card.id === id)

        if (localArticle) {
          setArticle(localArticle)
          setIsLocal(true)
        } else {
          // If not found in local storage, fetch from API
          const response = await axios.get(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
          )
          setArticle(response.data)
        }
      } catch (error) {
        console.error('Error fetching article:', error)
        setError(error)
      }
    }
    fetchArticle()
  }, [id])

  const handleLike = async () => {
    if (!isLoggedIn) {
      console.log('User must be logged in to like an article.')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      console.log('Token not found in localStorage.')
      return
    }

    try {
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      const updatedArticle = {
        ...article,
        liked: !article.likes.includes(token),
        likes: article.likes.includes(token)
          ? article.likes.filter((like) => like !== token)
          : [...article.likes, token],
      }
      setArticle(updatedArticle)

      // Update favorites in localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      if (updatedArticle.liked) {
        const index = favorites.findIndex((fav) => fav._id === article._id)
        if (index === -1) {
          favorites.push(updatedArticle)
        }
      } else {
        const index = favorites.findIndex((fav) => fav._id === article._id)
        if (index > -1) {
          favorites.splice(index, 1)
        }
      }
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Error liking article:', error)
      setError(error)
    }
  }

  if (!article) {
    return <p>Loading...</p>
  }

  const {
    image,
    title,
    web,
    subtitle,
    description,
    address,
    phone,
    email,
    likes,
  } = article

  return (
    <div className="container mt-4">
      <div className="card">
        {image && (
          <img
            src={image.url}
            alt={image.alt}
            className="card-img-top"
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
          <p className="card-text">{description}</p>
          <div>
            {web && (
              <p>
                <FaGlobe />{' '}
                <a
                  href={`https://${web}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {web}
                </a>
              </p>
            )}
            {phone && (
              <p>
                <FaPhone /> {phone}
              </p>
            )}
            {email && (
              <p>
                <FaEnvelope /> {email}
              </p>
            )}
            {address && (
              <p>
                {address.street} {address.houseNumber}, {address.city},{' '}
                {address.state}, {address.country}
              </p>
            )}
            <button
              onClick={handleLike}
              className="btn btn-link p-0"
            >
              <FaHeart color={article.liked ? 'red' : 'gray'} />
              <span style={{ margin: '10px' }}>{likes.length}</span>
            </button>
          </div>
        </div>
        <Link
          style={{ width: '20%', margin: '0 auto' }}
          to={`/cards`}
          className="btn btn-primary mt-3"
        >
          Go Back
        </Link>
      </div>
    </div>
  )
}

export default ArticleCard
