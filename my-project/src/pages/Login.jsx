import React, { useState,useEffect } from "react";
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, Flex } from "@chakra-ui/react";
import Lottie from "lottie-react";
import plantAnimation from "../animations/login.json";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom'; 
import { loginUser } from '../authSlice';



function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
const navigate = useNavigate();
const { isAuthenticated, loading, error: authError } = useSelector((state) => state.auth);

  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    if (!form.email || !form.password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    
     await dispatch(loginUser({
    emailId: form.email,
    password: form.password,
  }));
  alert(`user logged in suceesfully`);
  navigate('/home');
  };

  return (
    <Flex
      minH="100vh"
      w="100%"
      bg="green.100"
      direction={["column", "column", "row"]} 

        borderWidth="5px"        
  borderColor="green.500"  
    >

      <Flex flex={1} align="center" justify="center" mb={[8, 8, 0]}>
        <Box maxW="md" w="full" p={8}  borderRadius="lg" bg="white" shadow="lg"   borderWidth="2px"        
  borderColor="green.500"  
   >
          <Heading textAlign="center" size="lg" mb={6} color="green.600">
            Login
          </Heading>

          <VStack spacing={4} align="stretch">

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </FormControl>


            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </FormControl>

            {error && <Text color="red.500">{error}</Text>}

            <Button colorScheme="green" w="full" onClick={onSubmit}>
              Login
            </Button>
          </VStack>
        </Box>
      </Flex>


      <Flex flex={1} align="center" justify="center">
        <Box maxW={["80%", "60%", "400px"]}>
          <Lottie animationData={plantAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Login;
