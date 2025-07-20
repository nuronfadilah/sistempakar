import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const userId = authData.user?.id;

    const { error: insertError } = await supabase.from('users').insert([
      {
        id: userId,
        email,
        password,
        role: 'user',
        full_name: fullName,
      },
    ]);

    if (insertError) {
      setError('Register gagal: ' + insertError.message);
    } else {
      alert('Registrasi berhasil. Silakan cek email untuk konfirmasi.');
      navigate('/login');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Registration</h2>
          <div className="input-group">
            <input type="text" placeholder="Username" onChange={(e) => setFullName(e.target.value)} required />
            
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            
          </div>
          <button type="submit" className="register-button">Register</button>
          {error && <p className="error">{error}</p>}
         
        </form>
      </div>

      <div className="register-right">
        <h2>Welcome Back!</h2>
        <p>Already have an account?</p>
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default Register;
