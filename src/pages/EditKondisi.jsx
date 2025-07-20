
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // ✅ ganti ke react-router-dom
import { supabase } from '../services/supabase.js'
import '../styles/EditKondisi.css'
import Navbar from '../components/Navbar';

export default function EditKondisi() {
  const [form, setForm] = useState({
    kode: '',
    pertanyaan: '',
    jenis_input: 'text',
    opsi: ''
  })

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('kondisi')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Gagal ambil data:', error)
        return
      }

      if (data) {
        setForm({
          kode: data.kode,
          pertanyaan: data.pertanyaan,
          jenis_input: data.jenis_input,
          opsi: data.opsi ? data.opsi.join(', ') : ''
        })
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const opsiArray =
      form.jenis_input === 'select' || form.jenis_input === 'radio'
        ? form.opsi.split(',').map((o) => o.trim())
        : null

    const { error } = await supabase
      .from('kondisi')
      .update({
        kode: form.kode,
        pertanyaan: form.pertanyaan,
        jenis_input: form.jenis_input,
        opsi: opsiArray
      })
      .eq('id', id)

    if (!error) {
      navigate('/kondisiPage') // ✅ untuk React Router
    } else {
      console.error('Update gagal:', error)
    }
  }

  return (
    <>
    <Navbar />
   <div className="edit-container">
  <h1>Edit Kondisi</h1>
  <form onSubmit={handleSubmit} className="edit-form">
    <div>
      <label>Kode</label>
      <input
        type="text"
        name="kode"
        value={form.kode}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Pertanyaan</label>
      <input
        type="text"
        name="pertanyaan"
        value={form.pertanyaan}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Jenis Input</label>
      <select
        name="jenis_input"
        value={form.jenis_input}
        onChange={handleChange}
      >
        <option value="text">Text</option>
        <option value="select">Select</option>
        <option value="radio">Radio</option>
      </select>
    </div>
    {(form.jenis_input === 'select' || form.jenis_input === 'radio') && (
      <div>
        <label>Opsi (pisahkan dengan koma)</label>
        <input
          type="text"
          name="opsi"
          value={form.opsi}
          onChange={handleChange}
        />
      </div>
    )}
    <button type="submit">Update</button>
  </form>
</div>
</>

  )
}
