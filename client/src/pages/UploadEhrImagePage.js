import { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem, CircularProgress } from '@mui/material';

function UploadEhrImagePage() {
  const [ehrs, setEhrs] = useState([]);
  const [ehrId, setEhrId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/ehr', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setEhrs)
      .catch(console.error);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !ehrId) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`http://localhost:3000/upload/image/${ehrId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      alert('File uploaded!');
      setFile(null);
    } catch (err) {
      alert('Upload error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Uploading an image to a medical history
      </Typography>

      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextField
          select
          label="Choose EHR"
          value={ehrId}
          onChange={(e) => setEhrId(e.target.value)}
          required
        >
          {ehrs.map(ehr => (
            <MenuItem key={ehr.id} value={ehr.id}>
              #{ehr.id} — {ehr.diagnosis}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="file"
          inputProps={{ accept: 'image/*' }}
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <Button type="submit" variant="contained" disabled={loading || !file}>
          {loading ? 'Loadind...' : 'Load'}
        </Button>
      </form>
    </Box>
  );
}

export default UploadEhrImagePage;
