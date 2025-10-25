import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'

export default function CreatePickup(){
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [wasteTypes, setWasteTypes] = useState('')
  const [estimatedWeight, setEstimatedWeight] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault(); setError(null)
    try{
      const payload = { wasteTypes: wasteTypes.split(',').map(s=>s.trim()), estimatedWeight: Number(estimatedWeight), address: { city } }
      const res = await api.post('/pickups', payload)
  const id = res.data.pickup._id || res.data.pickup.id
  navigate(`/pickup/${id}`)
    }catch(err){
      setError(err.response?.data?.error || 'Create pickup failed')
    }
  }

  if (!user) return <div className="page container card">You must be logged in to schedule a pickup.</div>

  return (
    <div className="page container card" style={{maxWidth:600}}>
      <h2>Schedule Pickup</h2>
      <form onSubmit={submit}>
        <label>Waste types (comma separated)</label>
        <input value={wasteTypes} onChange={e=>setWasteTypes(e.target.value)} placeholder="Plastics, Glass" required />
        <label>Estimated weight (kg)</label>
        <input type="number" value={estimatedWeight} onChange={e=>setEstimatedWeight(e.target.value)} required />
        <label>City</label>
        <input value={city} onChange={e=>setCity(e.target.value)} required />
        {error && <div className="badge status-cancelled" style={{marginTop:8}}>{error}</div>}
        <div style={{marginTop:12}}>
          <button className="btn btn-primary" type="submit">Schedule</button>
        </div>
      </form>
    </div>
  )
}
