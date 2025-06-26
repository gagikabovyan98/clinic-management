import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const registerRes = await fetch('http://localhost:3000/auth/staff/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!registerRes.ok) {
      alert('Registration failed');
      return;
    }

    const loginRes = await fetch('http://localhost:3000/auth/staff/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      alert('Login failed');
      return;
    }

    const data = await loginRes.json();
    localStorage.setItem('token', data.access_token);

    navigate('/staff/dashboard');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Register as Staff</Typography>
      <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" margin="normal" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleSubmit}>Register</Button>
    </Box>
  );
};

export default Register;