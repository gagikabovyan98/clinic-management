import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function EhrListPage() {
  const [ehrs, setEhrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/ehr', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setEhrs(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Истории болезней
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ehrs.map(ehr => (
              <TableRow key={ehr.id}>
                <TableCell>{ehr.id}</TableCell>
                <TableCell>{ehr.diagnosis}</TableCell>
                <TableCell>{ehr.patient?.name || '—'}</TableCell>
                <TableCell>{new Date(ehr.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default EhrListPage;