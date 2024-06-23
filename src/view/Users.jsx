import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { jwtDecode } from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        setIsAdmin(decodedToken.isAdmin)

        const response = await axios.get(
          'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users',
          {
            headers: {
              'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck`,
            },
          }
        )
        localStorage.setItem('users', JSON.stringify(response.data))
        setTimeout(() => {
          setLoading(false)
        }, 1000)
        setUsers(response.data)
      } catch (error) {
        setError('Error fetching users')
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
        {
          headers: { 'x-auth-token': token },
        }
      )

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))
    } catch (error) {
      setError('Error deleting user')
      console.error('Error deleting user:', error)
    }
  }

  if (!users) {
    return <p className="text-center mt-4">Loading...</p>
  }

  if (loading) {
    return (
      <div class="d-flex justify-content-center text-secondary">
        <div
          class="spinner-border"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  console.log(users)
  return (
    <div
      className="container mt-4 "
      style={{ width: '95%' }}
    >
      <h2 className="text-center mb-3">Users</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>
              <th>id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th style={{ width: '10px' }}>Email</th>
              <th>Country</th>
              <th>City</th>
              <th>Admin</th>
              <th>Bussiness</th>

              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.address.country}</td>
                <td>{user.address.city}</td>
                <td>
                  {user.isAdmin ? (
                    <b style={{ color: 'green' }}>True</b>
                  ) : (
                    <b style={{ color: 'red' }}>False</b>
                  )}
                </td>
                <td>
                  {user.isBusiness ? (
                    <b style={{ color: 'green' }}>True</b>
                  ) : (
                    <b style={{ color: 'red' }}>False</b>
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <>
                      <Link
                        to={`/users/${user._id}`}
                        className="btn btn-info btn-sm me-2"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/edit-user/${user._id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash /> Delete
                      </button>
                    </>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
