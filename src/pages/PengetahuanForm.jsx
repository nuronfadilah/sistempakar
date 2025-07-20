import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import NavbarAdmin from '../components/NavbarAdmin';

export default function PengetahuanForm() {
  const navigate = useNavigate();
  const [aturanList, setAturanList] = useState([]);
  const [kondisiList, setKondisiList] = useState([]);
  const [idAturan, setIdAturan] = useState('');
  const [idKondisi, setIdKondisi] = useState('');
  const [nilai, setNilai] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch data aturan dan kondisi
  useEffect(() => {
    const fetchDropdownData = async () => {
      const { data: aturan, error: err1 } = await supabase.from('aturan').select('id, hasil');
      const { data: kondisi, error: err2 } = await supabase.from('kondisi').select('id, pertanyaan');

      if (err1 || err2) {
        console.error('Gagal mengambil data aturan/kondisi:', err1 || err2);
      } else {
        setAturanList(aturan);
        setKondisiList(kondisi);
      }
    };
    fetchDropdownData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!idAturan || !idKondisi) {
      setErrorMsg('Semua field wajib diisi.');
      return;
    }

    const { error } = await supabase.from('pengetahuan').insert({
      id_aturan: idAturan,
      id_kondisi: idKondisi,
      nilai: nilai,
    });

    if (error) {
      console.error('Gagal menyimpan data:', error.message);
      setErrorMsg('Gagal menyimpan data. Silakan coba lagi.');
    } else {
      navigate('/pengetahuan');
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container mx-auto p-4 max-w-xl">
        <h2 className="text-xl font-bold mb-4">Tambah Pengetahuan</h2>
        {errorMsg && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Aturan</label>
            <select
              value={idAturan}
              onChange={(e) => setIdAturan(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Pilih Aturan --</option>
              {aturanList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id_aturan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Kondisi</label>
            <select
              value={idKondisi}
              onChange={(e) => setIdKondisi(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Pilih Kondisi --</option>
              {kondisiList.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.id_kondisi}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Nilai</label>
            <select
              value={nilai}
              onChange={(e) => setNilai(e.target.value === 'true')}
              className="w-full border p-2 rounded"
            >
              <option value="true">Ya</option>
              <option value="false">Tidak</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary">Simpan</button>
            <button
              type="button"
              onClick={() => navigate('/pengetahuan')}
              className="btn btn-secondary"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
