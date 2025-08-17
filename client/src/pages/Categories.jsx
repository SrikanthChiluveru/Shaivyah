import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import ProductCard from '../components/ProductCard'

export default function Category(){
  const { name } = useParams()
  const [list,setList] = useState([])
  useEffect(()=>{ (async()=>{ const {data}=await api.get('/api/products?category='+encodeURIComponent(name)); setList(data) })() }, [name])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  )
}
