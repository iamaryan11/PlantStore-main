import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
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

const ADMIN_LOGIN_URL = 'http://localhost:3000/user/login';

function AdminLogin() {

  const navigate = useNavigate(); 

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  

  const [isLoading, setIsLoading] = useState(false);
  

  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
 
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');
    setIsError(false);

    try {
      const payload = { emailId, password };
      

      const response = await axios.post(ADMIN_LOGIN_URL, payload, {
        withCredentials: true, 
      });

    
      if (response.status === 200) {
        setStatusMessage("Logged in successfully!");
        toast({
          title: "Login Successful",
          description: "You have been logged in as an admin. Redirecting...",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
       
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 3000);
      }
    } catch (error) {
      setIsError(true);
     
      console.error("Admin login error:", error);
      
      let errorMessage = 'An error occurred during login.';
     
      if (error.response && error.response.data) {
      
        errorMessage = error.response.data;
      }
      setStatusMessage(errorMessage);
      toast({
        title: "Login Failed",
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
            Admin Login
          </Heading>
          <Text textAlign="center" color="gray.600">
            Log in to manage the application.
          </Text>

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <VStack spacing={4}>
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
                Login
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

          <Link color="teal.500" href="/admin/register" mt={4}>
            Don't have an admin account? Register here.
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
}

export default AdminLogin;
