import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'

export default function PickupDetails() {
  const { id } = useParams()
  const [pickup, setPickup] = useState({
    status: 'scheduled',
    scheduledDate: new Date().toISOString(),
    estimatedWeight: '25 kg',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    tracking: [
      {
        status: 'Request Received',
        timestamp: new Date().toISOString(),
        description: 'Your pickup request has been received and is being processed'
      },
      {
        status: 'Driver Assigned',
        timestamp: new Date(Date.now() + 1800000).toISOString(), // +30 mins
        description: 'Driver John has been assigned to your pickup'
      },
      {
        status: 'En Route',
        timestamp: new Date(Date.now() + 3600000).toISOString(), // +1 hour
        description: 'Driver is en route to your location'
      }
    ]
  })

  useEffect(() => {
    // Fetch pickup details from backend
    axios.get(`/pickups/${id}`)
      .then(response => {
        if (response.data) {
          setPickup(response.data)
        }
      })
      .catch(error => console.error('Error fetching pickup details:', error))
  }, [id])

  return (
    <div className="container" style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '0 1rem'
    }}>
      <h2 style={{
        fontSize: '2rem',
        color: '#2C3E50',
        marginBottom: '2rem'
      }}>Pickup Details</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div className="info-card">
          <h3>Status</h3>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            backgroundColor: pickup.status === 'completed' ? '#e8f5e9' 
              : pickup.status === 'scheduled' ? '#e3f2fd'
              : '#fff3e0',
            color: pickup.status === 'completed' ? '#2e7d32'
              : pickup.status === 'scheduled' ? '#1976d2'
              : '#f57c00',
            fontWeight: 500
          }}>
            {pickup.status}
          </div>
        </div>

        <div className="info-card">
          <h3>Scheduled Date</h3>
          <p>{new Date(pickup.scheduledDate).toLocaleString()}</p>
        </div>

        <div className="info-card">
          <h3>Estimated Weight</h3>
          <p>{pickup.estimatedWeight}</p>
        </div>

        <div className="info-card">
          <h3>Address</h3>
          <p style={{lineHeight: '1.5'}}>
            {pickup.address.street}<br />
            {pickup.address.city}, {pickup.address.state}<br />
            {pickup.address.pincode}
          </p>
        </div>
      </div>

      <div style={{marginTop: '2rem'}}>
        <h3 style={{
          fontSize: '1.5rem',
          color: '#2C3E50',
          marginBottom: '1.5rem'
        }}>Tracking Information</h3>
        
        <div className="timeline" style={{
          position: 'relative',
          paddingLeft: '2rem'
        }}>
          {pickup.tracking.map((event, index) => (
            <div key={index} style={{
              position: 'relative',
              paddingBottom: '2rem'
            }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-2rem',
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                border: '2px solid white',
                boxShadow: '0 0 0 2px #4CAF50'
              }}></div>
              
              {/* Timeline line */}
              {index < pickup.tracking.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '1rem',
                  bottom: '0',
                  width: '2px',
                  backgroundColor: '#4CAF50'
                }}></div>
              )}
              
              {/* Event content */}
              <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  fontWeight: 500,
                  color: '#2C3E50',
                  marginBottom: '0.5rem'
                }}>{event.status}</div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#666',
                  marginBottom: '0.5rem'
                }}>{new Date(event.timestamp).toLocaleString()}</div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#666'
                }}>{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .info-card {
          padding: 1.5rem;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .info-card h3 {
          font-size: 1rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .info-card p {
          font-size: 1.125rem;
          color: #2C3E50;
          margin: 0;
        }
      `}</style>
    </div>
  )
}