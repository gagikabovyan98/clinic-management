import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, List, ListItem } from '@mui/material';

function PatientDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:3000/patient/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();

        if (res.ok) {
          setData(json);
        } else {
          console.error('Upload error', json.message);
        }
      } catch (err) {
        console.error('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 8, mx: 'auto', display: 'block' }} />;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Welcome,{data?.email}
      </Typography>
      <Typography variant="h6">Your techniques:</Typography>
      <List>
        {data?.appointments?.map((appt) => (
          <ListItem key={appt.id}>
            📅 {new Date(appt.appointmentDate).toLocaleString()} — {appt.reason}
          </ListItem>
        )) ?? <ListItem>No entries</ListItem>}
      </List>
    </Box>
  );
}

export default PatientDashboard;
