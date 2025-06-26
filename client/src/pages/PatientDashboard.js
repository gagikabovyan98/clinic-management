import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PatientDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/patient/login');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 8, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        You are logged in as a patient.
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/ehr/images')}
        >
          View EHR Records
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
}

export default PatientDashboard;