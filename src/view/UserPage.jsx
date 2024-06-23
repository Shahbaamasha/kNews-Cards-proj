import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function UserPage({ userId }) {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
          {
            headers: { 'x-auth-token': token },
          }
        )
        setUserData(response.data)
        localStorage.setItem('userDetails', JSON.stringify(response.data))
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching user:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  if (error) return <p className="text-center mt-4">Error: {error.message}</p>
  if (!userData) return null

  return (
    <div className="d-flex flex-column ">
      <div className="container mt-4 flex-grow-1">
        <div className="card">
          <div className="card-header">
            <h2 className="text-center">User Details</h2>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>First Name:</strong> {userData.name.first}
              </li>
              <li className="list-group-item">
                <strong>Middle Name:</strong> {userData.name.middle}
              </li>
              <li className="list-group-item">
                <strong>Last Name:</strong> {userData.name.last}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong> {userData.phone}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {userData.email}
              </li>
              <li className="list-group-item">
                <strong>State:</strong> {userData.address.state}
              </li>
              <li className="list-group-item">
                <strong>Country:</strong> {userData.address.country}
              </li>
              <li className="list-group-item">
                <strong>City:</strong> {userData.address.city}
              </li>
              <li className="list-group-item">
                <strong>Street:</strong> {userData.address.street}
              </li>
              <li className="list-group-item">
                <strong>House Number:</strong> {userData.address.houseNumber}
              </li>
              <li className="list-group-item">
                <strong>Zip:</strong> {userData.address.zip}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage
