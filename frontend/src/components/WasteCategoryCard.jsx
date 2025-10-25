import React from 'react'

export default function WasteCategoryCard({ category }){
  return (
    <div className="card" style={{padding:12}}>
      <div style={{fontSize:16,fontWeight:600}}>{category.name}</div>
      <div style={{fontSize:14,color:'var(--color-text-secondary)'}}>{category.description}</div>
      <div style={{marginTop:10,fontSize:14}}>
        Typical Items: {category.examples?.join(', ') ?? '—'}
      </div>
      <div style={{marginTop:8,fontSize:13,color:'#388E3C'}}>
        Rate per kg: <span style={{fontWeight:500}}>{category.ratePerKg ?? 'N/A'}</span>
      </div>
      <div style={{marginTop:4,fontSize:13,color:'#3498db'}}>
        Recyclability Score: <span style={{fontWeight:500}}>{category.recyclabilityScore ?? 'N/A'}</span>
      </div>
    </div>
  )
}
