import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

export default function MyPickups(){
  const [pickups, setPickups] = useState([])
  useEffect(()=>{
    api.get('/pickups?mine=true').then(r=>{
      setPickups(r.data.pickups || [])
    }).catch(()=>{})
  },[])

  return (
    <div className="page container">
      <h2>My Pickups</h2>
      <div className="card">
        <ul>
          {pickups.map(p => (
            <li key={p._id || p.id} style={{marginBottom:8}}>
              <Link to={`/pickups/${p._id || p.id}`}>{new Date(p.createdAt).toLocaleString()}</Link>
              <div style={{fontSize:12,color:'var(--color-text-secondary)'}}>Status: {p.status} — {p.estimatedWeight ?? '—'}kg</div>
            </li>
          ))}
          {pickups.length===0 && <li style={{color:'var(--color-text-secondary)'}}>No pickups found</li>}
        </ul>
      </div>
    </div>
  )
}
