import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';

function UploadEhrImagePage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/patient', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setPatients(Array.isArray(data) ? data : data.patients || []))
      .catch(console.error);
  }, [token]);

  const handleUpload = async () => {
    if (!file || !selectedPatient) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`http://localhost:3000/ehr/upload/${selectedPatient}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      alert('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Medical Image
      </Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Patient</InputLabel>
        <Select
          value={selectedPatient}
          label="Patient"
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          {patients.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name} (#{p.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: '1rem' }}
      />

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={loading || !file || !selectedPatient}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
    </Box>
  );
}

export default UploadEhrImagePage;