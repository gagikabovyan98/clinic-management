// src/components/EhrImages.js
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Card,
  CardMedia,
} from '@mui/material';
import { useState, useEffect } from 'react';

function EhrImages({ ehrId }) {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchEhr = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/ehr/${ehrId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch images');
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error(err);
      alert('Error fetching EHR images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEhr();
  }, [ehrId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`http://localhost:3000/upload/image/${ehrId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      setFile(null);
      fetchEhr();
      alert('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <Box sx={{ p: 4, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Medicine Pictures
      </Typography>

      <form onSubmit={handleUpload}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button variant="contained" color="primary" type="submit" disabled={!file}>
            Upload
          </Button>
        </Box>
      </form>

      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : images.length === 0 ? (
          <Typography color="textSecondary">No pictures</Typography>
        ) : (
          <Grid container spacing={2}>
            {images.map((url, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={url}
                    alt={`EHR ${ehrId} image ${idx + 1}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default EhrImages;
