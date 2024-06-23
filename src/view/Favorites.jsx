import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

function Favorites({ isLoggedIn }) {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setArticles(storedFavorites.map((article) => ({ ...article, liked: true })))
  }, [])

  const handleUnlike = (id) => {
    const updatedArticles = articles.filter((article) => article._id !== id)
    setArticles(updatedArticles)
    localStorage.setItem('favorites', JSON.stringify(updatedArticles))
  }

  if (!isLoggedIn) {
    return <p className="text-center">Log in to see your favorite articles.</p>
  }
  console.log(articles)
  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-3">Favorite Articles</h2>
      <div className="row">
        {articles.length === 0 ? (
          <p className="text-center">No favorite articles yet.</p>
        ) : (
          articles.map((article) => (
            <div
              key={article._id}
              className="col-md-4 mb-4"
            >
              <div className="card">
                {article.image && (
                  <img
                    src={article.image.url}
                    alt={article.image.alt}
                    className="card-img-top"
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button
                      className="btn btn-link"
                      onClick={() => handleUnlike(article._id)}
                    >
                      <FaHeart color="red" />
                      <span>{article.likes.length}</span>
                    </button>
                  </div>
                  <Link
                    to={`/favorite-details/${article._id}`}
                    className="btn btn-primary mt-3"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Favorites
