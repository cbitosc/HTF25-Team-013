import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Register(){
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try{
  const res = await api.post('/auth/register', { name, email, password });
      const { token, user } = res.data;
      login(token, user);
      navigate('/dashboard');
    }catch(err){
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="page container card" style={{maxWidth:420}}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <div className="badge status-cancelled" style={{marginTop:8}}>{error}</div>}
        <div style={{marginTop:12}}>
          <button className="btn btn-primary" type="submit">Register</button>
          <Link to="/login" style={{marginLeft:12}}>Login</Link>
        </div>
      </form>
    </div>
  );
}
