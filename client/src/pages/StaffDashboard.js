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
        Employee Panel
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        You are logged in as an employee. What do you want to do??
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/patients')}>
          Patient management
        </Button>
        <Button variant="contained" onClick={() => navigate('/ehr')}>
          Case histories
        </Button>
        <Button variant="contained" onClick={() => navigate('/ehr/upload')}>
          Upload medical image
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Log out
        </Button>
      </Box>
    </Box>
  );
}

export default StaffDashboard;
