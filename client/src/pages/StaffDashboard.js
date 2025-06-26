import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function StaffDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 8, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Staff Dashboard
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        You are logged in as a staff member. What would you like to do?
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/patients')}>
          Manage Patients
        </Button>
        <Button variant="contained" onClick={() => navigate('/appointments/create')}>
          Create Appointment
        </Button>
        <Button variant="contained" onClick={() => navigate('/ehr')}>
          View EHRs
        </Button>
        <Button variant="contained" onClick={() => navigate('/ehr/upload')}>
          Upload Medical Image
        </Button>
        <Button variant="contained" onClick={() => navigate('/rooms')}>
          Manage Rooms
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Log out
        </Button>
      </Box>
    </Box>
  );
}

export default StaffDashboard;
