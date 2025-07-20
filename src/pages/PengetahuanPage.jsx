import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import NavbarAdmin from '../components/NavbarAdmin';
import '../styles/Pengetahuan.css';

export default function PengetahuanPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
  .from('pengetahuan')
  .select(`
    id,
    nilai,
    aturan:id_aturan( hasil),
    kondisi:id_kondisi( pertanyaan)
  `)

    if (error) {
      console.error('Gagal fetch pengetahuan:', error);
    } else {
      setData(data);
    }
  };

  const deletePengetahuan = async (id) => {
    if (confirm('Yakin ingin menghapus entri ini?')) {
      const { error } = await supabase.from('pengetahuan').delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="pengetahuan-container">
  <h2 className="pengetahuan-header"> Basis Pengetahuan</h2>
  <Link to="/pengetahuan/tambah" className="btn btn-primary">+ Tambah Pengetahuan</Link>
  <table className="pengetahuan-table">
    <thead>
      <tr>
        <th>Aturan</th>
        <th>Kondisi</th>
        <th>Nilai</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          <td>{row.aturan?.hasil}</td>
          <td>{row.kondisi?.pertanyaan}</td>
          <td>{row.nilai ? 'Ya' : 'Tidak'}</td>
          <td>
            <div className="pengetahuan-buttons">
              <Link to={`/pengetahuan/edit/${row.id}`} className="btn btn-warning">Edit</Link>
              <button onClick={() => deletePengetahuan(row.id)} className="btn btn-danger">Hapus</button>
            </div>
          </td>
        </tr>
      ))}
      {data.length === 0 && (
        <tr>
          <td colSpan="4" className="no-data">Belum ada basis pengetahuan</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </>
  );
}
