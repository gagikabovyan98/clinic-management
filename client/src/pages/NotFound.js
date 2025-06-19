import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3">404 - Page Not Found</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Sorry, the page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
}

export default NotFound;