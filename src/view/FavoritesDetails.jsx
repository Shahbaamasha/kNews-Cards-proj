import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaGlobe, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa'
import defaultImage from '../assets/images/noPic.jpg' // Import your default image

function FavoriteDetails() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    // Retrieve favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []

    // Find the article by id in favorites
    const selectedArticle = favorites.find((fav) => fav._id === id)

    // Set the selected article to state
    if (selectedArticle) {
      setArticle(selectedArticle)
    }
  }, [id])

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
            src={image.url || defaultImage}
            alt={image.alt || 'Default'}
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
            <button className="btn btn-link p-0">
              <FaHeart color="red" />
              <span>{likes.length}</span>
            </button>
          </div>
        </div>
        <Link
          style={{ width: '20%', margin: '0 auto' }}
          to={`/favorites`}
          className="btn btn-primary mt-3"
        >
          Go Back
        </Link>
      </div>
    </div>
  )
}

export default FavoriteDetails
