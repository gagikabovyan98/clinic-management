import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';

function EhrListPage() {
  const { patientId } = useParams();
  const [ehrList, setEhrList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/ehr/patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setEhrList(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [patientId]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        EHR Images for Patient #{patientId}
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {ehrList.map((ehr) => (
            <Grid item key={ehr.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3000/uploads/ehr/${ehr.imageUrl}`}
                  alt={`EHR image ${ehr.id}`}
                />
                <CardContent>
                  <Typography variant="subtitle2">EHR ID: {ehr.id}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default EhrListPage;