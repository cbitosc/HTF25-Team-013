import React from 'react'

export default function StatsCard({ title, value, icon, trend, color }){
  return (
    <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div>
        <div style={{fontSize:12,color:'var(--color-text-secondary)'}}>{title}</div>
        <div style={{fontSize:24,fontWeight:700}}>{value}</div>
        {trend && <div style={{fontSize:12,color:'var(--color-text-secondary)'}}>{trend}</div>}
      </div>
      <div style={{fontSize:32, padding:12, borderRadius:8, background: color || 'var(--color-secondary)' }}>{icon}</div>
    </div>
  )
}
