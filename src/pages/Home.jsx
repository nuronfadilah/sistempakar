import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



export default function Home() {
  
  return (
     <>
      <Navbar />
      <Header />
    </>
  );
}
