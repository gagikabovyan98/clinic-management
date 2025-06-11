import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/auth/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.access_token);
        onLogin();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 4, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField label="Email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField label="Password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        {error && <Typography color="error" mt={2}>{error}</Typography>}

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;