import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';

const CreateAppointmentPage = () => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [loading, setLoading] = useState(false);

  const [staffList, setStaffList] = useState([]);
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    if (!date) return;
    fetch(`http://localhost:3000/rooms/available/${date}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Failed to fetch rooms', err));
  }, [date]);

  useEffect(() => {
    fetch('http://localhost:3000/staff', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => setStaffList(data));

    fetch('http://localhost:3000/patients', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => setPatientList(data));
  }, []);

  const handleSubmit = async () => {
    if (!date || !reason || !roomId || !staffId || !patientId) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    const res = await fetch('http://localhost:3000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        appointmentDate: date,
        reason,
        roomId: Number(roomId),
        staffId: Number(staffId),
        patientId: Number(patientId),
      }),
    });

    if (res.status === 409) {
      alert('This room is already occupied at the selected time.');
    } else if (res.ok) {
      alert('Appointment created successfully!');
    } else {
      alert('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Appointment
      </Typography>

      <TextField
        label="Appointment Date"
        type="date"
        fullWidth
        margin="normal"
        value={date}
        onChange={e => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Reason"
        fullWidth
        margin="normal"
        value={reason}
        onChange={e => setReason(e.target.value)}
      />

      <TextField
        select
        label="Select Patient"
        fullWidth
        margin="normal"
        value={patientId}
        onChange={e => setPatientId(e.target.value)}
      >
        {patientList.map(p => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Select Staff"
        fullWidth
        margin="normal"
        value={staffId}
        onChange={e => setStaffId(e.target.value)}
      >
        {staffList.map(s => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Select Room"
        fullWidth
        margin="normal"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        disabled={!rooms.length}
      >
        {rooms.map(r => (
          <MenuItem key={r.id} value={r.id}>
            {r.name}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Create Appointment'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAppointmentPage;