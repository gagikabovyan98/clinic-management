import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    api('/patient/me')
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <VStack spacing={6} align="start">
        <Heading size="lg" color="teal.600">Patient Profile</Heading>
        <Button colorScheme="red" onClick={handleLogout} alignSelf="flex-end">
          Logout
        </Button>

        {loading ? (
          <Spinner />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <>
            <Text><b>ID:</b> {profile.id}</Text>
            <Text><b>Email:</b> {profile.email}</Text>
          </>
        )}
      </VStack>
    </Box>
  );
}

export default Profile;
