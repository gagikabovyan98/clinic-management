import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddRoomPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, description }),
      });

      if (res.ok) {
        navigate('/rooms');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to create room');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Add Room
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Create Room
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddRoomPage;
