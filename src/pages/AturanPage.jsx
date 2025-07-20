import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import NavbarAdmin from '../components/NavbarAdmin';
import '../styles/AturanPage.css';

function AturanPage() {
  const [aturan, setAturan] = useState([]);
  const [kondisiMap, setKondisiMap] = useState({});

  // Fetch semua kondisi dan buatkan mapping id -> deskripsi
  const fetchKondisiMap = async () => {
    const { data, error } = await supabase.from('aturan').select('id, kode, deskripsi');
    if (error) {
      console.error('Error ambil kondisi:', error);
      return;
    }
    const map = {};
    data.forEach(k => {
      map[k.id_aturan] = `${k.kode} - ${k.deskripsi}`;
    });
    setKondisiMap(map);
  };

  // Fetch semua aturan
  const fetchAturan = async () => {
    const { data, error } = await supabase.from('aturan').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error ambil aturan:', error);
      return;
    }
    setAturan(data);
  };

  useEffect(() => {
    fetchKondisiMap();
    fetchAturan();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus aturan ini?')) {
      await supabase.from('aturan').delete().eq('id', id);
      fetchAturan();
    }
  };

  return (
    <>
    <NavbarAdmin />
    <div className="container">
  <h2 className="heading">Daftar Aturan</h2>
  <Link to="/admin/aturan/tambah" className="add-button">+Tambah Aturan</Link>

  <div className="table-wrapper">
    <table className="table">
      <thead>
        <tr>
          <th className="border px-4 py-2 font-semibold text-gray-700">Kode</th>
          <th className="border px-4 py-2 font-semibold text-gray-700">Kondisi</th>
          <th className="border px-4 py-2 font-semibold text-gray-700">Hasil</th>
          <th className="border px-4 py-2 font-semibold text-gray-700">Deskripsi</th>
          <th className="border px-4 py-2 font-semibold text-gray-700 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
         {aturan.map((a) => (
          <tr key={a.id} className="hover:bg-gray-50 transition">
            <td className="border px-4 py-2 font-medium">{a.kode}</td>
            <td className="border px-4 py-2">
              <ul className="list-disc list-inside space-y-1">
                {a.kondisi_ids.map((kid) => (
                  <li key={kid}>{kondisiMap[kid] || kid}</li>
                ))}
              </ul>
            </td>
            <td className="border px-4 py-2">{a.hasil}</td>
            <td className="border px-4 py-2">{a.deskripsi}</td>
            <td className="border px-4 py-2 text-center space-x-2">
              <button
                to={`/admin/aturan/edit/${a.id}`}
                className="text-blue-600 hover:underline"
              >
               Edit
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-600 hover:underline"
              >
                 Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    </>
  );
}

export default AturanPage;
