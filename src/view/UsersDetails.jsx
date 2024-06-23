import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../component/Footer'

function UsersDetails() {
  const { userId } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
          {
            headers: {
              'x-auth-token': token,
            },
          }
        )
        setUserData(response.data)

        setTimeout(() => {
          setLoading(false)
        }, 3000)
      } catch (error) {
        console.error('Error fetching user:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  if (loading)
    return (
      <div class="d-flex align-items-center">
        <strong>Loading...</strong>
        <div
          class="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    )
  if (error) return <p className="text-center mt-4">Error: {error.message}</p>
  if (!userData) return null

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">User Details</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <strong>First Name:</strong> {userData.name.first}
            </div>
            <div className="col-md-6">
              <strong>Middle Name:</strong> {userData.name.middle}
            </div>
            <div className="col-md-6">
              <strong>Last Name:</strong> {userData.name.last}
            </div>
            <div className="col-md-6">
              <strong>Phone:</strong> {userData.phone}
            </div>
            <div className="col-md-6">
              <strong>Email:</strong> {userData.email}
            </div>
            <div className="col-md-6">
              <strong>State:</strong> {userData.address.state}
            </div>
            <div className="col-md-6">
              <strong>Country:</strong> {userData.address.country}
            </div>
            <div className="col-md-6">
              <strong>City:</strong> {userData.address.city}
            </div>
            <div className="col-md-6">
              <strong>Street:</strong> {userData.address.street}
            </div>
            <div className="col-md-6">
              <strong>House Number:</strong> {userData.address.houseNumber}
            </div>
            <div className="col-md-6">
              <strong>Zip:</strong> {userData.address.zip}
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/users')}
          >
            Back to Users
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UsersDetails
