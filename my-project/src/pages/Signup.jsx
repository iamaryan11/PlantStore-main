import React, { useState, useEffect } from "react";
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, Flex } from "@chakra-ui/react";
import Lottie from "lottie-react";
import plantAnimation from "../animations/Girl.json";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerUser } from '../authSlice';

function Signup() {
  const [form, setForm] = useState({ firstname: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    const { firstname, email, phone, password } = form;
    if (!firstname || !email || !phone || !password) {
      setError("All fields are required!");
      return;
    }
    setError("");

    try {

      await dispatch(registerUser({
        firstName: firstname,
        emailId: email,
        phoneNumber: phone,
        password,
      }));

        alert("Signup successful! Please login.");


    navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Try again!");
    }
  };

  return (
    <Flex minH="100vh" w="100%" bg="green.100" direction={["column", "column", "row"]}>

      <Flex flex={1} align="center" justify="center" mb={[8, 8, 0]}>
        <Box maxW={["80%", "60%", "500px"]}>
          <Lottie animationData={plantAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
        </Box>
      </Flex>


      <Flex flex={1} align="center" justify="center">
        <Box maxW="md" w="full" p={8} borderWidth="1px" borderRadius="lg" bg="white" shadow="lg">
          <Heading textAlign="center" size="lg" mb={6} color="green.600">Sign Up</Heading>
          <VStack spacing={4} align="stretch">
            <FormControl id="firstname" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="text" placeholder="Enter your first name" name="firstname" value={form.firstname} onChange={handleChange} />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" name="email" value={form.email} onChange={handleChange} />
            </FormControl>

            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input type="tel" placeholder="Enter your phone number" name="phone" value={form.phone} onChange={handleChange} />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" name="password" value={form.password} onChange={handleChange} />
            </FormControl>

            {error && <Text color="red.500">{error}</Text>}

            <Button colorScheme="green" w="full" onClick={onSubmit} isLoading={loading}>
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Signup;
