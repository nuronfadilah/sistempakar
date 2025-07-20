import './App.css'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/home'
import KondisiPage from './pages/KondisiPage'
import Konsultasi from './pages/Konsultasi'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import TambahKondisi from './pages/TambahKondisi'
import EditKondisi from './pages/EditKondisi'
import AturanPage from './pages/AturanPage'
import AturanForm from './pages/AturanForm'
import PengetahuanPage from './pages/PengetahuanPage'
import PengetahuanForm from './pages/PengetahuanForm'
import Tentang from './pages/Tentang'


function App() {
  return (
    

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminDasboard" element={<AdminDashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/konsultasi" element={<Konsultasi />} /> 
      <Route path="/kondisiPage" element={<KondisiPage />} />
      <Route path="/tambahKondisi" element={<TambahKondisi />} />
      <Route path="/admin/kondisi/edit/:id" element={<EditKondisi />} />
      <Route path="/admin/aturan" element={<AturanPage />} />
      <Route path="/admin/aturan/tambah" element={<AturanForm />} />
      <Route path="/admin/aturan/edit/:id" element={<AturanForm />} />
      <Route path="/pengetahuan" element={<PengetahuanPage />} />
      <Route path="/pengetahuan/tambah" element={<PengetahuanForm />} />
      <Route path="/pengetahuan/edit/:id" element={<PengetahuanForm />} />
      <Route path="/tentang" element={<Tentang />} />


    </Routes>
  )
}

export default App
