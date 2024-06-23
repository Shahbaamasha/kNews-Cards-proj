import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: {
      first: '',
      middle: '',
      last: '',
    },
    phone: '',
    email: '',
    password: '',
    image: {
      url: 'www.example.com/image.jpg',
      alt: '',
    },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: '',
    },
    isBusiness: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    const nameParts = name.split('.')

    if (nameParts.length > 1) {
      setFormData((prevFormData) => {
        let nestedField = { ...prevFormData }
        let currentField = nestedField

        for (let i = 0; i < nameParts.length - 1; i++) {
          currentField = currentField[nameParts[i]]
        }

        currentField[nameParts[nameParts.length - 1]] = value

        return nestedField
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users',
        formData
      )
      console.log('User registered:', response.data)

      localStorage.setItem('token', response.data.token)

      window.location.href = '/login'
    } catch (error) {
      console.error('Error registering user:', error)
      setErrors(error.response.data.errors)
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: { ...formData.image, url: file.name } })
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="name.first"
            value={formData.name.first}
            onChange={handleChange}
            minLength={2}
            maxLength={256}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            className="form-control"
            id="middleName"
            name="name.middle"
            value={formData.name.middle}
            onChange={handleChange}
            minLength={2}
            maxLength={256}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="name.last"
            value={formData.name.last}
            onChange={handleChange}
            minLength={2}
            maxLength={256}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            minLength={9}
            maxLength={11}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={7}
            maxLength={20}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
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
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            minLength={2}
            maxLength={256}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            minLength={2}
            maxLength={256}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street *</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            minLength={2}
            maxLength={256}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseNumber">House Number *</label>
          <input
            type="number"
            className="form-control"
            id="houseNumber"
            name="address.houseNumber"
            value={formData.address.houseNumber}
            onChange={handleChange}
            min={2}
            max={256}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip *</label>
          <input
            type="number"
            className="form-control"
            id="zip"
            name="address.zip"
            value={formData.address.zip}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isBusiness"
            name="isBusiness"
            checked={formData.isBusiness}
            onChange={handleCheckboxChange}
          />
          <label
            className="form-check-label"
            htmlFor="isBusiness"
          >
            Signup as Business
          </label>
        </div>
        <div className="d-flex gap-5">
          <button
            className="btn btn-primary"
            type="submit"
          >
            Signup
          </button>
          <button
            type="button"
            className="btn btn-danger"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setFormData({})}
          >
            Refresh
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
