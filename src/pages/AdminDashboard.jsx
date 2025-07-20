// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase.js';
import NavbarAdmin from '../components/NavbarAdmin';
import Header from '../components/Header';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        navigate('/login');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (userData?.role !== 'admin') {
        navigate('/not-authorized');
      } else {
        setUser(data.user);
      }
    };

    checkUser();
  }, [navigate]);

  if (!user) return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
      <>
      <NavbarAdmin />
      <Header />
      </>
  );
  
}

function DashboardCard({ title, link }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer bg-white shadow-md hover:shadow-lg transition p-5 rounded-xl border border-gray-200"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500 mt-2">Klik untuk melihat {title.toLowerCase()}.</p>
    </div>
  );
}
