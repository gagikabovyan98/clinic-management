import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <Typography variant="h4" mb={3}>
        Welcome to the clinic system
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => navigate('/staff/login')} sx={{ mr: 1 }}>
          Login as employee
        </Button>
        <Button variant="outlined" onClick={() => navigate('/register')}>
          Register as an employee
        </Button>
      </Box>
      <Button variant="contained" onClick={() => navigate('/patient/login')}>
        Login as a patient
      </Button>
      <Typography variant="caption" mt={2} color="text.secondary" sx={{ maxWidth: 300, textAlign: 'center' }}>
        Patients register only through administrators
      </Typography>
    </Box>
  );
}

export default Home;