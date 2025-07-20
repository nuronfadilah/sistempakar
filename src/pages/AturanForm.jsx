// src/pages/admin/AturanForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase.js';
import NavbarAdmin from '../components/NavbarAdmin';
import '../styles/AturanForm.css'; // ⬅️ tambahkan ini

function AturanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kode, setKode] = useState('');
  const [hasil, setHasil] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kondisiList, setKondisiList] = useState([]);
  const [kondisiTerpilih, setKondisiTerpilih] = useState([]);

  const fetchKondisi = async () => {
    const { data, error } = await supabase.from('kondisi').select('*');
    if (!error) setKondisiList(data);
  };

  const fetchAturanById = async () => {
    const { data } = await supabase.from('aturan').select('*').eq('id', id).single();
    if (data) {
      setKode(data.kode);
      setHasil(data.hasil);
      setDeskripsi(data.deskripsi || '');
      setKondisiTerpilih(data.kondisi_ids || []);
    }
  };

  useEffect(() => {
    fetchKondisi();
    if (id) fetchAturanById();
  }, [id]);

  const handleCheckboxChange = (kondisi_id) => {
    setKondisiTerpilih(prev =>
      prev.includes(kondisi_id) ? prev.filter(k => k !== kondisi_id) : [...prev, kondisi_id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { kode, hasil, deskripsi, kondisi_ids: kondisiTerpilih };

    if (id) {
      await supabase.from('aturan').update(data).eq('id', id);
    } else {
      await supabase.from('aturan').insert(data);
    }

    navigate('/admin/aturan');
  };

  return (
    <>
      <NavbarAdmin />
      <div className="admin-container">
        <h2 className="admin-heading">{id ? 'Edit Aturan' : 'Tambah Aturan'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Kode</label>
            <input type="text" value={kode} onChange={(e) => setKode(e.target.value)} required className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Hasil</label>
            <input type="text" value={hasil} onChange={(e) => setHasil(e.target.value)} required className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi</label>
            <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="form-textarea" />
          </div>

          <div className="form-group">
            <label className="form-label">Pilih Kondisi</label>
            <div className="checkbox-list">
              {kondisiList.map(k => (
                <label key={k.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={k.id}
                    checked={kondisiTerpilih.includes(k.id)}
                    onChange={() => handleCheckboxChange(k.id)}
                  />
                  {k.pertanyaan}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            {id ? 'Simpan Perubahan' : 'Tambah Aturan'}
          </button>
        </form>
      </div>
    </>
  );
}

export default AturanForm;
