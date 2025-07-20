
import '../styles/Tentang.css';
import Navbar from '../components/Navbar';


const Tentang = () => {
  return (
    <>
    <Navbar />
    <div className="tentang-container">
      <h2 className="tentang-title">Tentang Sistem Pakar Waris Islam</h2>
      <p className="tentang-deskripsi">
        Sistem Pakar Waris Islam adalah sebuah platform berbasis web yang dirancang untuk membantu umat Islam dalam menentukan ahli waris dan pembagian harta warisan berdasarkan prinsip-prinsip faraidh sesuai dengan hukum Islam. Dengan memanfaatkan pendekatan kecerdasan buatan dan aturan syariah yang berlaku, sistem ini memberikan hasil perhitungan yang akurat, cepat, dan mudah dipahami oleh masyarakat umum.
      </p>
      <p className="tentang-deskripsi">
        Pengguna hanya perlu menjawab beberapa pertanyaan sederhana terkait kondisi keluarga dan hubungan kekerabatan. Berdasarkan jawaban tersebut, sistem akan menganalisis data dan menyimpulkan siapa saja yang berhak menerima warisan serta besaran porsinya. Ini sangat bermanfaat untuk menghindari kesalahan dalam distribusi waris dan mempermudah proses konsultasi waris tanpa harus bertatap muka langsung dengan ahli hukum Islam.
      </p>
      <p className="tentang-deskripsi">
        Diharapkan dengan adanya sistem ini, proses pembagian warisan dapat dilakukan dengan lebih adil, transparan, dan sesuai dengan syariat, sehingga mampu mencegah konflik antar keluarga yang sering terjadi akibat ketidaktahuan terhadap hukum waris Islam.
      </p>
    </div>
    </>
  );
};

export default Tentang;
