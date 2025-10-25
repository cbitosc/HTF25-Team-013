import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Login(){
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      
      if (!token || !user) {
        setError('Invalid response from server');
        return;
      }

      // Store auth data
      login(token, user);
      
      // Clear any existing errors
      setError(null);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="page" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div className="container card" style={{
        maxWidth: 400,
        width: '100%',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          color: '#333',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>Login</h2>
        <form onSubmit={submit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#555',
              fontWeight: '500'
            }}>Email</label>
            <input 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              required 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#555',
              fontWeight: '500'
            }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              required 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          {error && <div className="badge status-cancelled" style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#fee',
            color: '#e44',
            borderRadius: '4px',
            textAlign: 'center'
          }}>{error}</div>}
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <button 
              className="btn btn-primary" 
              type="submit" 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>Login</button>
            <Link 
              to="/register" 
              style={{
                color: '#4CAF50',
                textDecoration: 'none'
              }}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
