import { useEffect, useState } from 'react'

const slides = [
  { id:1, url:'https://images.unsplash.com/photo-1542089363-4a6c2a9c9c59?q=80&w=1600&auto=format&fit=crop' },
  { id:2, url:'https://images.unsplash.com/photo-1573693130606-587d48f6ab2b?q=80&w=1600&auto=format&fit=crop' },
  { id:3, url:'https://images.unsplash.com/photo-1552960562-daf630e9278b?q=80&w=1600&auto=format&fit=crop' }
]

export default function Carousel(){
  const [i,setI] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setI(v => (v+1)%slides.length), 3000)
    return ()=> clearInterval(t)
  },[])
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-soft">
      {slides.map((s,idx)=>(
        <img key={s.id} src={s.url} className={`w-full h-[360px] object-cover absolute inset-0 transition-opacity duration-700 ${i===idx?'opacity-100':'opacity-0'}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-3xl font-extrabold">Where tradition meets modern grace India</h2>
      </div>
    </div>
  )
}
