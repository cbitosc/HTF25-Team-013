import React, { useEffect, useState, useRef } from 'react'
import StatsCard from '../components/StatsCard'
import WasteCategoryCard from '../components/WasteCategoryCard'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import Chart from 'chart.js/auto'

const getDefaultItems = (categoryName) => {
  const defaults = {
    'Metals': ['Aluminum cans', 'Steel containers', 'Copper wires', 'Metal utensils', 'Scrap metal'],
    'Plastics': ['PET bottles', 'Plastic containers', 'Food packaging', 'Shopping bags', 'Bottle caps'],
    'Glass': ['Glass bottles', 'Glass jars', 'Broken glassware', 'Window glass', 'Light bulbs'],
    'Paper': ['Newspapers', 'Cardboard boxes', 'Magazines', 'Office paper', 'Paper bags'],
    'E-Waste': ['Old phones', 'Computers', 'Chargers', 'Batteries', 'Electronic toys']
  }
  return defaults[categoryName] || []
}

export default function Dashboard(){
  const [stats, setStats] = useState({totalPickups: 0, completed:0, pending:0})
  const [categories, setCategories] = useState([])
  const [centers, setCenters] = useState([])
  const [recentPickups, setRecentPickups] = useState([])
  const chartRef = useRef(null)
  const donutRef = useRef(null)

  useEffect(()=>{
    // fetch categories and centers; these endpoints return sample fallback data when DB not connected
    axios.get('/waste/categories').then(r=> {
      // Add typical items if they're missing
      const categoriesWithItems = r.data.map(cat => ({
        ...cat,
        examples: cat.examples || getDefaultItems(cat.name)
      }))
      setCategories(categoriesWithItems)
    }).catch(()=>{})
    axios.get('/recycling-centers').then(r=> setCenters(r.data)).catch(()=>{})
    // fetch recent pickups
    axios.get('/pickups').then(r => {
      if(r?.data?.pickups) setRecentPickups(r.data.pickups.slice(0,5))
    }).catch(()=>{})

    // fetch lightweight stats from backend; falls back in the axios catch
    axios.get('/stats').then(r=>{
      if(r?.data?.stats){
        const s = r.data.stats
        setStats({ totalPickups: s.total, completed: s.completed, pending: s.pending })
      }
    }).catch(()=>{
      // offline fallback
      setStats({totalPickups: 28, completed: 20, pending: 8})
    })
  }, [])

  useEffect(()=>{
    if(!chartRef.current) return
    const ctx = chartRef.current.getContext('2d')
    const labels = centers.map(c => c.name)
    const data = centers.map((c,i) => (c.capacity ?? (50 - i*5)))
    const chart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{label:'Capacity', data, backgroundColor: 'rgba(54,162,235,0.6)'}] },
      options: {responsive:true, maintainAspectRatio:false}
    })
    return ()=> chart.destroy()
  }, [centers])

  useEffect(()=>{
    if(!donutRef.current) return
    const ctx = donutRef.current.getContext('2d')
    const data = [stats.completed || 0, stats.pending || 0]
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels:['Completed','Pending'], datasets:[{data, backgroundColor:['#4caf50','#ff9800']}] },
      options: {responsive:true, maintainAspectRatio:false}
    })
    return ()=> chart.destroy()
  }, [stats])

  return (
    <div className="dashboard-container" style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#2C3E50',
          margin: 0
        }}>Dashboard</h2>
        <Link 
          to="/pickups/new" 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
        >
          <span>➕</span> Schedule New Pickup
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <StatsCard 
          title="Total Pickups" 
          value={stats.totalPickups} 
          icon="🚚" 
          trend="+4% this month" 
          color="#3498db"
        />
        <StatsCard 
          title="Completed" 
          value={stats.completed} 
          icon="✅" 
          trend="Stable" 
          color="#2ecc71"
        />
        <StatsCard 
          title="Pending" 
          value={stats.pending} 
          icon="⏳" 
          trend="—" 
          color="#f1c40f"
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.5rem'
      }}>
        <div className="card" style={{
          padding: '1.5rem',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: 360
        }}>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#2C3E50',
            marginBottom: '1rem'
          }}>Pickup Capacity by Center</div>
          <div style={{height: 280}}>
            <canvas ref={chartRef} />
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div className="card" style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: 180
          }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '1rem'
            }}>Completion Rate</div>
            <div style={{height: 120}}>
              <canvas ref={donutRef} />
            </div>
          </div>

          <div className="card" style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Nearby Centers</span>
              <span style={{
                fontSize: '0.875rem',
                color: '#4CAF50',
                cursor: 'pointer'
              }}>View All</span>
            </div>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {centers.slice(0,5).map(c=> (
                <li key={c._id || c.id} style={{
                  fontSize: '0.95rem',
                  color: '#2C3E50',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{color: '#4CAF50'}}>📍</span>
                  <div>
                    <div style={{fontWeight: 500}}>{c.name}</div>
                    <div style={{fontSize: '0.85rem', color: '#666'}}>{c.address?.city ?? ''}</div>
                  </div>
                </li>
              ))}
              {centers.length===0 && 
                <li style={{
                  color: '#666',
                  textAlign: 'center',
                  padding: '1rem'
                }}>No centers available</li>
              }
            </ul>
          </div>
          <div className="card" style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Recent Pickups</span>
              <Link to="/pickups" style={{
                fontSize: '0.875rem',
                color: '#4CAF50',
                textDecoration: 'none'
              }}>View All</Link>
            </div>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {recentPickups.map(p => (
                <li key={p._id || p.id} style={{
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <Link 
                      to={`/pickup/${p._id || p.id}`}
                      style={{
                        color: '#4CAF50',
                        textDecoration: 'none',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        if (!p._id && !p.id) {
                          e.preventDefault()
                          alert('Sorry, this pickup details are not available')
                        }
                      }}
                    >
                      {new Date(p.createdAt).toLocaleString()}
                    </Link>
                    <div style={{fontSize: '0.85rem', color: '#666'}}>
                      {p.status} • {p.estimatedWeight ? `${p.estimatedWeight}kg` : 'N/A'}
                    </div>
                  </div>
                  <div style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    backgroundColor: (p.status === 'completed' || p.status === 'finished') ? '#e8f5e9' 
                      : p.status === 'scheduled' ? '#e3f2fd'
                      : '#fff3e0',
                    color: (p.status === 'completed' || p.status === 'finished') ? '#2e7d32'
                      : p.status === 'scheduled' ? '#1976d2'
                      : '#f57c00'
                  }}>
                    {p.status === 'finished' ? 'completed' : p.status}
                  </div>
                </li>
              ))}
              {recentPickups.length === 0 && (
                <li style={{color: '#666', textAlign: 'center', padding: '1rem'}}>
                  No recent pickups
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <h3 style={{marginTop:18}}>Waste Categories</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {categories.map(cat => (
          <WasteCategoryCard key={cat._id || cat.id || cat.name} category={cat} />
        ))}
        {categories.length===0 && <div className="card">No categories found</div>}
      </div>
    </div>
  )
}
