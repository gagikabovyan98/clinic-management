import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === 'patient' ? '/auth/patient/login' : '/auth/staff/login';

    const res = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.access_token);
      onLogin();
    } else {
      alert(data.message || 'logine error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <label>Email:</label>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />

      <label>Password:</label>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />

      <label>Role:</label>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="staff">Staff</option>
      </select>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
