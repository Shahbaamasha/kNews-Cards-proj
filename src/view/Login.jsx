import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login',
        formData
      )
      if (response && response.data) {
        console.log('User logged in:', response.data)
        const token = response.data // Ensure the token is properly extracted from response.data
        if (!token) {
          throw new Error('Token not found in response data')
        }
        localStorage.setItem('token', token)

        onLogin(token)

        navigate('/')
      } else {
        setErrors({ message: 'No token received from the server' })
      }
    } catch (error) {
      console.error('Error logging in user:', error)
      setErrors({
        message: error.response?.data?.message || 'Error logging in user',
      })
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
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
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errors.message && <p className="text-danger">{errors.message}</p>}
        <button
          className="btn btn-primary"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
