import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

function CreateCard() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: { url: '', alt: '' },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: '',
    },
  })
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    const keys = name.split('.')
    if (keys.length === 1) {
      setFormData({ ...formData, [name]: value })
    } else {
      setFormData({
        ...formData,
        [keys[0]]: { ...formData[keys[0]], [keys[1]]: value },
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
        formData,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      setShowModal(true) // Show modal on successful card creation
    } catch (error) {
      setError('Error creating card: ' + error.response.data)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    navigate('/cards') // Redirect to cards page after closing the modal
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-3">Create New Card</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label"
          >
            Title
          </label>
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
        <div className="mb-3">
          <label
            htmlFor="subtitle"
            className="form-label"
          >
            Subtitle
          </label>
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
        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label"
          >
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone"
            className="form-label"
          >
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="web"
            className="form-label"
          >
            Website
          </label>
          <input
            type="url"
            className="form-control"
            id="web"
            name="web"
            value={formData.web}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="imageUrl"
            className="form-label"
          >
            Image URL
          </label>
          <input
            type="url"
            className="form-control"
            id="imageUrl"
            name="image.url"
            value={formData.image.url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="imageAlt"
            className="form-label"
          >
            Image Alt Text
          </label>
          <input
            type="text"
            className="form-control"
            id="imageAlt"
            name="image.alt"
            value={formData.image.alt}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="state"
            className="form-label"
          >
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="country"
            className="form-label"
          >
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="city"
            className="form-label"
          >
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="street"
            className="form-label"
          >
            Street
          </label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="houseNumber"
            className="form-label"
          >
            House Number
          </label>
          <input
            type="number"
            className="form-control"
            id="houseNumber"
            name="address.houseNumber"
            value={formData.address.houseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="zip"
            className="form-label"
          >
            Zip Code
          </label>
          <input
            type="number"
            className="form-control"
            id="zip"
            name="address.zip"
            value={formData.address.zip}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Card
        </button>
      </form>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Card Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your new card has been successfully created.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCloseModal}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateCard
