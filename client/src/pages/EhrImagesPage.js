import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';

function EhrImagesPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchImages = async () => {
    try {
      const res = await fetch(`http://localhost:3000/ehr/records`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []); // 🔧 защита от 400 ответа
    } catch (err) {
      console.error('Failed to load images', err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  fetchImages();
}, []);

  if (loading) {
    return <CircularProgress sx={{ mt: 4, mx: 'auto', display: 'block' }} />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Medical images
      </Typography>

      <Grid container spacing={3}>
        {images.map((ehr) => (
          <Grid item xs={12} sm={6} md={4} key={ehr.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={ehr.imageUrl}
                alt="EHR image"
              />
              <CardContent>
                <Typography variant="body1">
                  {ehr.description || 'No description'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(ehr.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EhrImagesPage;