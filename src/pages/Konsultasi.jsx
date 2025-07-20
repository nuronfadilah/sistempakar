
import { useEffect, useState } from 'react';
import '../styles/Konsultasi.css';
import Navbar from '../components/Navbar';
import { supabase } from '../services/supabase.js';

function Konsultasi() {
  const [step, setStep] = useState(0);
  const [kondisiList, setKondisiList] = useState([]);
  const [filteredKondisi, setFilteredKondisi] = useState([]);
  const [jawaban, setJawaban] = useState({});
  const [hasil, setHasil] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [totalHutang, setTotalHutang] = useState('');
  const [punyaPasangan, setPunyaPasangan] = useState('');
  const [hartaList, setHartaList] = useState([]);
  const [namaHarta, setNamaHarta] = useState('');
  const [nilaiHarta, setNilaiHarta] = useState('');
  const [saved, setSaved] = useState(false);

  const totalHarta = hartaList.reduce((acc, curr) => acc + curr.nilai, 0);
  const sisaHarta = totalHarta - parseFloat(totalHutang || 0);

  useEffect(() => {
    fetchKondisi();
  }, []);

  useEffect(() => {
    if (punyaPasangan === 'Tidak') {
      const filtered = kondisiList.filter(k =>
        k.pertanyaan.toLowerCase().includes('ayah') ||
        k.pertanyaan.toLowerCase().includes('ibu')
      );
      setFilteredKondisi(filtered);
    } else {
      setFilteredKondisi(kondisiList);
    }
    setStep(0); // Reset step saat kondisi berubah
  }, [punyaPasangan, kondisiList]);

  const fetchKondisi = async () => {
    const { data, error } = await supabase.from('kondisi').select('*');
    if (!error) setKondisiList(data);
  };

  const handleAnswer = (value) => {
    const current = filteredKondisi[step];
    setJawaban({ ...jawaban, [current.id]: value });

    if (step < filteredKondisi.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit({ ...jawaban, [current.id]: value });
    }
  };

  const handleSubmit = async (finalJawaban) => {
    const selectedIds = Object.keys(finalJawaban).filter((id) => finalJawaban[id] === true);

    const { data: pengetahuan } = await supabase
      .from('pengetahuan')
      .select('*, aturan(*)');

    const hasilAturan = pengetahuan
      .filter((p) => selectedIds.includes(p.id_kondisi) && p.nilai === true)
      .map((p) => p.aturan?.hasil);

    const hasilUnik = [...new Set(hasilAturan)];
    setHasil(hasilUnik.join(', ') || 'Tidak ditemukan aturan yang cocok.');
    setSaved(true);
  };

  const handleAddHarta = () => {
    if (namaHarta && nilaiHarta) {
      setHartaList([...hartaList, { nama: namaHarta, nilai: parseFloat(nilaiHarta) }]);
      setNamaHarta('');
      setNilaiHarta('');
    }
  };

  const handleDeleteHarta = (index) => {
    const newList = [...hartaList];
    newList.splice(index, 1);
    setHartaList(newList);
  };

  return (
    <>
      <Navbar />
      <div className="konsultasi-wrapper">
        <h2 className="judul">Konsultasi Ahli Waris</h2>

         {/* Harta */}
        <div className="form-section">
          <label>Nama Harta</label>
          <input type="text" value={namaHarta} onChange={(e) => setNamaHarta(e.target.value)} />
        </div>

        <div className="form-section">
          <label>Nilai Harta (Rp)</label>
          <input type="number" value={nilaiHarta} onChange={(e) => setNilaiHarta(e.target.value)} />
        </div>

        <button className="btn primary" onClick={handleAddHarta}>Tambah Harta</button>

        {hartaList.length > 0 && (
          <table className="tabel-harta">
            <thead>
              <tr>
                <th>Nama Harta</th>
                <th>Nilai</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {hartaList.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>Rp {item.nilai.toLocaleString()}</td>
                  <td><button className="btn danger" onClick={() => handleDeleteHarta(index)}>Hapus</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Input dasar */}
        <div className="form-section">
          <label>Nama Pewaris</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>

        <div className="form-section">
          <label>Jenis Kelamin</label>
          <select value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div className="form-section">
          <label>Total Hutang (Rp)</label>
          <input type="number" value={totalHutang} onChange={(e) => setTotalHutang(e.target.value)} />
        </div>

        <div className="form-section">
          <label>Apakah punya pasangan?</label>
          <select value={punyaPasangan} onChange={(e) => setPunyaPasangan(e.target.value)}>
            <option value="">Pilih</option>
            <option value="Ya">Ya</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div>

       

        {/* Slide pertanyaan */}
        {punyaPasangan && filteredKondisi.length > 0 && step < filteredKondisi.length && (
          <div className="pertanyaan-slide">
            <h4>{filteredKondisi[step]?.pertanyaan}</h4>
            <div className="jawaban-buttons">
              <button className="btn" onClick={() => handleAnswer(true)}>Ya</button>
              <button className="btn" onClick={() => handleAnswer(false)}>Tidak</button>
            </div>
          </div>
        )}

        {/* Hasil akhir */}
        {saved && (
          <div className="hasil-akhir">
            <h4>Hasil Konsultasi</h4>
            <p><strong>Nama:</strong> {nama}</p>
            <p><strong>Jenis Kelamin:</strong> {jenisKelamin}</p>
            <p><strong>Total Harta:</strong> Rp {totalHarta.toLocaleString()}</p>
            <p><strong>Hutang:</strong> Rp {parseFloat(totalHutang || 0).toLocaleString()}</p>
            <p><strong>Sisa Warisan:</strong> Rp {sisaHarta.toLocaleString()}</p>
            <p><strong>Punya Pasangan:</strong> {punyaPasangan}</p>
            <p><strong>Kesimpulan:</strong> {hasil}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Konsultasi;
