import { Box, Typography } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Welcome to the staff dashboard.
      </Typography>
    </Box>
  );
}

export default Dashboard;