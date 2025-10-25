import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

export default function PickupDetail() {
  const { id } = useParams()
  const [pickup, setPickup] = useState(null)
  useEffect(() => {
    api.get(`/pickups/${id}`).then(r => {
      // Accept both { pickup: {...} } and flat {...}
      if (r.data.pickup) setPickup(r.data.pickup)
      else setPickup(r.data)
    }).catch(() => setPickup(null))
  }, [id])

  if (!pickup || typeof pickup !== 'object') return <div className="page container">Pickup details not found or loading...</div>

  // Fallbacks for missing fields
  const status = pickup.status || 'unknown'
  const scheduledDate = pickup.scheduledDate ? new Date(pickup.scheduledDate).toLocaleString() : 'Not scheduled'
  const estimatedWeight = pickup.estimatedWeight ? `${pickup.estimatedWeight} kg` : 'Not specified'
  const address = pickup.address?.street && pickup.address?.city
    ? `${pickup.address.street}, ${pickup.address.city}`
    : (pickup.address?.city || pickup.address?.street || 'Address not provided')

  // Accept both tracking.updates and tracking (array)
  let updates = []
  if (pickup.tracking?.updates?.length) updates = pickup.tracking.updates
  else if (Array.isArray(pickup.tracking)) updates = pickup.tracking
  else if (Array.isArray(pickup.updates)) updates = pickup.updates

  return (
    <div className="page-container">
      <div className="detail-card">
        <h2 style={{
          fontSize: '1.75rem',
          color: '#2C3E50',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #e1e4e8',
          paddingBottom: '1rem'
        }}>Pickup Details</h2>

        <div className="info-grid">
          <div className="info-item">
            <label>Status</label>
            <div className={`status-badge ${status}`}>
              {status}
            </div>
          </div>
          <div className="info-item">
            <label>Scheduled Date</label>
            <div className="value">{scheduledDate}</div>
          </div>
          <div className="info-item">
            <label>Estimated Weight</label>
            <div className="value">{estimatedWeight}</div>
          </div>
          <div className="info-item">
            <label>Address</label>
            <div className="value">{address}</div>
          </div>
        </div>

        <div className="tracking-section">
          <h3 style={{
            fontSize: '1.25rem',
            color: '#2C3E50',
            marginTop: '2rem',
            marginBottom: '1rem'
          }}>Tracking Information</h3>
          {updates.length > 0 ? (
            <div className="timeline">
              {updates.map((update, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="update-time">{update.timestamp ? new Date(update.timestamp).toLocaleString() : ''}</div>
                    <div className="update-status">{update.status || update.description || 'Update'}</div>
                    {update.note && <div className="update-note">{update.note}</div>}
                    {update.description && !update.status && <div className="update-note">{update.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              color: '#666',
              textAlign: 'center'
            }}>
              No tracking updates available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
