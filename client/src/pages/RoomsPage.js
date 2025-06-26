import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button
} from '@mui/material';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/rooms', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Список комнат
      </Typography>
      <Button
      variant="contained"
      color="primary"
      sx={{ mb: 2 }}
      onClick={() => window.location.href = '/rooms/add'}
      >
      Добавить комнату
      </Button>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{room.name}</Typography>
                <Typography color="textSecondary">
                  {room.description || 'Нет описания'}
                </Typography>
                <Typography sx={{ marginTop: '1rem' }}>
                  Статус:{' '}
                  <span
                    style={{
                      color: room.appointments?.length ? 'red' : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    {room.appointments?.length ? 'Занята' : 'Свободна'}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomsPage;
