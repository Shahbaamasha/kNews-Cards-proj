// src/view/EditUser.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function EditUser() {
  const { id } = useParams()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
          {
            headers: { 'x-auth-token': token },
          }
        )
        setEmail(response.data.email)
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Server error')
      }
    }
    fetchUser()
  }, [id])

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
        { email },
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
      <h2 className="text-center mt-4 mb-3">Edit User</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleUpdateUser}>
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
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >
          Update User
        </button>
      </form>
    </div>
  )
}

export default EditUser
