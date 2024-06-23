// src/view/Home.jsx

import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="container">
      <h1 className="mt-4">Welcome to kNews</h1>
      <p className="lead">
        Discover the latest cards of articles related to our business.
      </p>
      <div className="map-container">
        <h2 className="mt-4">Our Location</h2>
        <iframe
          title="Tel Aviv Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26882.71320912272!2d34.76352775937494!3d32.08529994937492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b8b77b2b5f5%3A0x735cb42abf6b8b24!2sTel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1620320529294!5m2!1sen!2sil"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default Home
