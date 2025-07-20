import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import Navbar from '../components/Navbar';
import '../styles/TambahKondisi.css';

export default function TambahKondisi() {
  const [kode, setKode] = useState('');
  const [pertanyaan, setPertanyaan] = useState('');
  const [jenisInput, setJenisInput] = useState('text');
  const [opsi, setOpsi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const opsiArray =
      jenisInput === 'select' || jenisInput === 'radio'
        ? opsi.split(',').map((o) => o.trim())
        : null;

    const { error } = await supabase.from('kondisi').insert({
      kode,
      pertanyaan,
      jenis_input: jenisInput,
      opsi: opsiArray,
    });

    if (!error) navigate('/kondisiPage');
    else alert('Gagal menambahkan data!');
  };

  return (
    <>
      <Navbar />
      <div className="tambah-kondisi-container">
        <div className="form-card">
          <h1 className="form-title">Tambah Kondisi</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Kode</label>
              <input
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Pertanyaan</label>
              <input
                type="text"
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Jenis Input</label>
              <select
                value={jenisInput}
                onChange={(e) => setJenisInput(e.target.value)}
                className="form-select"
              >
                <option value="text">Text</option>
                <option value="select">Select (Dropdown)</option>
                <option value="radio">Radio Button</option>
              </select>
            </div>
            {(jenisInput === 'select' || jenisInput === 'radio') && (
              <div className="form-group">
                <label className="form-label">Opsi (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={opsi}
                  onChange={(e) => setOpsi(e.target.value)}
                  className="form-input"
                  placeholder="contoh: Ya,Tidak"
                />
              </div>
            )}
            <div className="form-group" style={{ textAlign: 'right' }}>
              <button type="submit" className="submit-button">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
