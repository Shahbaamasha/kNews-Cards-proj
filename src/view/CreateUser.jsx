// src/view/CreateUser.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users',
        { email, password },
        {
          headers: { 'x-auth-token': token },
        }
      )
      navigate('/users')
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error')
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-3">Create User</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleCreateUser}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >
          Create User
        </button>
      </form>
    </div>
  )
}

export default CreateUser
