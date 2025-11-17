import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Link,
  Flex
} from '@chakra-ui/react';
import axios from 'axios';


const ADMIN_REGISTER_URL = 'https://plantstore-backend-oj7s.onrender.com/user/adminRegister';

function AdminRegister() {

  const navigate = useNavigate();


  const [firstName, setFirstName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  

  const [isLoading, setIsLoading] = useState(false);
  

  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  

  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');
    setIsError(false);

    try {
      const payload = { firstName, emailId, password };
      

      const response = await axios.post(ADMIN_REGISTER_URL, payload, {
        withCredentials: true, 
      });


      if (response.status === 201) {
        setStatusMessage("Registration successful. Redirecting to login...");
        toast({
          title: "Registration Successful",
          description: "A new admin has been registered. You'll be redirected shortly.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        

        setTimeout(() => {
          navigate('/admin/login');
        }, 3000);
      }
    } catch (error) {
      setIsError(true);

      console.error("Admin registration error:", error);
      
      let errorMessage = 'An error occurred during registration.';

      if (error.response && error.response.data) {
        errorMessage = error.response.data;
      }
      setStatusMessage(errorMessage);
      toast({
        title: "Registration Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
    >
      <Box 
        p={8} 
        maxWidth="500px" 
        borderWidth={1} 
        borderRadius={8} 
        boxShadow="lg" 
        bg="white"
      >
        <VStack spacing={6}>
          <Heading as="h2" size="xl" textAlign="center" color="teal.500">
            Admin Registration
          </Heading>
          <Text textAlign="center" color="gray.600">
            Create a new admin account. Only an authenticated admin can do this.
          </Text>

          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>

              <FormControl id="emailId" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                isLoading={isLoading}
                mt={4}
              >
                Register Admin
              </Button>
            </VStack>
          </form>

          {statusMessage && (
            <Text
              mt={4}
              color={isError ? "red.500" : "green.500"}
              textAlign="center"
            >
              {statusMessage}
            </Text>
          )}

          <Link color="teal.500" href="/admin/dashboard" mt={4}>
            Go to Admin Dashboard
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
}

export default AdminRegister;
