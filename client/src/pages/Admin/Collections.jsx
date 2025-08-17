import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Categories(){
  const empty = { name:'', description:'', bannerImage:'' }
  const [list, setList] = useState([])
  const [form, setForm] = useState(empty)

  const load = async ()=>{ const {data}=await api.get('/api/categories'); setList(data) }
  useEffect(()=>{ load() }, [])

  const save = async ()=>{
    if (form._id) await api.put(`/api/categories/${form._id}`, form)
    else await api.post('/api/categories', form)
    setForm(empty); load()
  }
  const del = async (id)=>{ if(confirm('Delete?')){ await api.delete(`/api/categories/${id}`); load() } }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-4">
        <h3 className="font-bold mb-2">Create / Edit Category</h3>
        <input className="border rounded-xl px-3 py-2 w-full" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="border rounded-xl px-3 py-2 w-full mt-2" placeholder="Banner Image URL" value={form.bannerImage} onChange={e=>setForm({...form,bannerImage:e.target.value})}/>
        <textarea className="border rounded-xl px-3 py-2 w-full mt-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <div className="mt-3 flex gap-2">
          <button className="btn" onClick={save}>{form._id?'Update':'Create'}</button>
          {form._id && <button className="btn !bg-gray-200 !text-gray-900" onClick={()=>setForm(empty)}>Cancel</button>}
        </div>
      </div>
      <div className="space-y-3">
        {list.map(c => (
          <div key={c._id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-500">{c.description}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={()=>setForm(c)}>Edit</button>
              <button className="btn !bg-red-600" onClick={()=>del(c._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
