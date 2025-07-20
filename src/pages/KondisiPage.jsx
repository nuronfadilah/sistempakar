
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Pakai dari react-router-dom
import { supabase } from '../services/supabase'
import NavbarAdmin from '../components/NavbarAdmin';
import '../styles/KondisiPage.css'

export default function KondisiPage() {
  const [kondisi, setKondisi] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate() // ✅ Penting

  const fetchKondisi = async () => {
    const { data, error } = await supabase
      .from('kondisi')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setKondisi(data)

    setLoading(false)
  }

  useEffect(() => {
    fetchKondisi()
  }, [])

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus kondisi ini?')) {
      const { error } = await supabase.from('kondisi').delete().eq('id', id)
      if (!error) fetchKondisi()
    }
  }

  return (
    <>
      <NavbarAdmin />
    <div className="container">
  <h1 className="heading">Manajemen Kondisi</h1>

  <Link to="/tambahKondisi" className="add-button">
    + Tambah Kondisi
  </Link>

  {loading ? (
    <p className="loading-text">Memuat data...</p>
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th>Kode</th>
          <th>Pertanyaan</th>
          <th>Jenis Input</th>
          <th>Opsi</th>
          <th className="text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {kondisi.map((item) => (
          <tr key={item.id}>
            <td>{item.kode}</td>
            <td>{item.pertanyaan}</td>
            <td className="capitalize">{item.jenis_input}</td>
            <td>{item.opsi ? item.opsi.join(', ') : '-'}</td>
            <td className="text-center">
              <Link to={`/admin/kondisi/edit/${item.id}`} className="action-link">
                Edit
              </Link>
              <button onClick={() => handleDelete(item.id)} className="delete-button">
                Hapus
              </button>
            </td>
          </tr>
        ))}
        {kondisi.length === 0 && (
          <tr>
            <td colSpan="5" className="empty-state">
              Belum ada data kondisi.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>
    </>
  )
}
