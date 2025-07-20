import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login gagal: " + error.message);
    return;
  }

  const { user } = data;
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    alert("Gagal mengambil data role.");
    return;
  }

  // Redirect sesuai role
  if (profile.role === "admin") {
    window.location.href = "/adminDasboard";
  } else {
    window.location.href = "/home";
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="form-side">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
          </form>
         
        </div>
        <div className="welcome-side">
          <h2>Welcome Back!</h2>
          <p>Don't have an account?</p>
          <button
            className="outline-btn"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
