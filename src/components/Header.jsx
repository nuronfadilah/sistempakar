
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';


import '../styles/Header.css';

export default function HeroHeader() {
  
  return (
     <>

      <div className="home-container">
        <section className="hero-section">
          <h1>Selamat Datang di <span>Sistem Pakar Waris Islam</span></h1>
          <p>
            Temukan hak waris Anda sesuai hukum faraidh secara akurat dan mudah.
            Sistem kami membantu menghitung dan menentukan ahli waris berdasarkan syariat Islam.
          </p>
          <a href="/konsultasi" className="cta-button">🔍 Mulai Konsultasi</a>
        </section>

        <section className="features-section">
          <h2>✨ Fitur Unggulan</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🧠 Konsultasi Interaktif</h3>
              <p>Masukkan data keluarga untuk mendapatkan hasil perhitungan warisan sesuai syariat.</p>
            </div>
            <div className="feature-card">
              <h3>📜 Riwayat Konsultasi</h3>
              <p>Simpan dan lihat kembali hasil konsultasi Anda sebelumnya.</p>
            </div>
            <div className="feature-card">
              <h3>🔐 Login / Guest Mode</h3>
              <p>Gunakan akun Supabase Anda atau lanjutkan tanpa login sebagai tamu.</p>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <p>Ikuti kami di media sosial:</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTiktok /></a>
          </div>
          <p>© 2025 Sistem Pakar Waris Islam. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
