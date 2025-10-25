import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreatePickup from './pages/CreatePickup'
import PickupDetail from './pages/PickupDetail'
import PickupDetails from './pages/PickupDetails'

function Home(){
	return (
		<div className="page container">
			<h1>Inorganic Waste & Scrap Management</h1>
			<p>Welcome — this is the frontend scaffold. Build on this with the components and routes described.</p>
			<Link to="/dashboard" className="btn btn-primary">Go to Dashboard (protected)</Link>
		</div>
	)
}

export default function App(){
	return (
		<AuthProvider>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
				<Route path="/pickups" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
				<Route path="/pickups/new" element={<ProtectedRoute><CreatePickup/></ProtectedRoute>} />
				<Route path="/pickup/:id" element={<ProtectedRoute><PickupDetails/></ProtectedRoute>} />
			</Routes>
		</AuthProvider>
	)
}
