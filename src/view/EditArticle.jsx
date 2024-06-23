import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './EditArticle.css'

function EditArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    web: '',
    address: {
      street: '',
      houseNumber: '',
      city: '',
      state: '',
      country: '',
    },
    phone: '',
    email: '',
    image: {
      url: '',
      alt: '',
    },
  })
  const [errors, setErrors] = useState({})
  const [isLocal, setIsLocal] = useState(false)

  console.log(formData)
  useEffect(() => {
    const fetchArticle = async () => {
      // Check if the article is in local storage
      const storedArticles = JSON.parse(localStorage.getItem('formData')) || []
      const localArticle = storedArticles.find((article) => article.id === id)

      if (localArticle) {
        setFormData(localArticle)
        setIsLocal(true)
      } else {
        // Fetch from API if not found in local storage
        try {
          const response = await axios.get(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
          )
          setFormData(response.data)
          setIsLocal(false)
        } catch (error) {
          console.error('Error fetching article:', error)
        }
      }
    }
    fetchArticle()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    const keys = name.split('.')
    if (keys.length > 1) {
      setFormData((prevData) => {
        let data = { ...prevData }
        keys.reduce((acc, key, index) => {
          if (index === keys.length - 1) {
            acc[key] = value
          }
          return acc[key]
        }, data)
        return data
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isLocal) {
        // Update local storage
        const storedArticles =
          JSON.parse(localStorage.getItem('formData')) || []
        const updatedArticles = storedArticles.map((article) =>
          article.id === id ? formData : article
        )
        localStorage.setItem('formData', JSON.stringify(updatedArticles))
      } else {
        // Update API
        const token = localStorage.getItem('token')

        const cleanedData = { ...formData }
        delete cleanedData.image._id
        delete cleanedData.address._id
        delete cleanedData._id
        delete cleanedData.likes
        delete cleanedData.createdAt
        delete cleanedData.__v

        await axios.put(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
          cleanedData,
          {
            headers: {
              'x-auth-token': token,
            },
          }
        )
      }
      navigate(`/article-details/${id}`)
    } catch (error) {
      console.error('Error updating article:', error)
      setErrors({ message: 'Failed to update the article. Please try again.' })
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subtitle">Subtitle *</label>
          <input
            type="text"
            className="form-control"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="web">Website</label>
          <input
            type="text"
            className="form-control"
            id="web"
            name="web"
            value={formData.web}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseNumber">House Number</label>
          <input
            type="text"
            className="form-control"
            id="houseNumber"
            name="address.houseNumber"
            value={formData.address.houseNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="image.url"
            value={formData.image.url}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageAlt">Image Alt Text</label>
          <input
            type="text"
            className="form-control"
            id="imageAlt"
            name="image.alt"
            value={formData.image.alt}
            onChange={handleChange}
          />
        </div>

        {errors.message && <p className="text-danger">{errors.message}</p>}
        <button
          className="btn btn-primary mt-3"
          type="submit"
        >
          Save Changes
        </button>
      </form>
      <Link
        style={{ width: '20%', margin: '0 auto' }}
        to={`/cards`}
        className="btn btn-primary mt-3"
      >
        Go Back
      </Link>
    </div>
  )
}

export default EditArticle
