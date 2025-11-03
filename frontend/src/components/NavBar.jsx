import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function NavBar(){
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: '#1a1a1a',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
      <div style={{display:'flex', gap:'2rem', alignItems:'center'}}>
        <Link to="/" style={{
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#4CAF50',
          textDecoration: 'none'
        }}>Inorganic Waste</Link>
        <Link to="/dashboard" style={{
          color: '#ffffff',
          fontSize: '1.1rem',
          textDecoration: 'none',
          padding: '0.5rem 0',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s'
        }}>Dashboard</Link>
        <Link to="/pickups" style={{
          color: '#ffffff',
          fontSize: '1.1rem',
          textDecoration: 'none',
          padding: '0.5rem 0',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s'
        }}>My Pickups</Link>
        <Link to="/pickups/new" style={{
          color: '#ffffff',
          fontSize: '1.1rem',
          textDecoration: 'none',
          padding: '0.5rem 0',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.3s'
        }}>Schedule Pickup</Link>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        {user ? (
          <>
            <span style={{
              color: '#ffffff',
              fontSize: '1.1rem',
              marginRight: '1rem'
            }}>{user.name ?? user.email}</span>
            <button 
              className="btn" 
              onClick={()=>{ logout(); navigate('/login') }}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: '#ffffff',
              fontSize: '1.1rem',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              transition: 'background-color 0.3s'
            }}>Login</Link>
            <Link to="/register" style={{
              color: '#ffffff',
              fontSize: '1.1rem',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              backgroundColor: '#4CAF50',
              borderRadius: '4px',
              transition: 'background-color 0.3s'
            }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
