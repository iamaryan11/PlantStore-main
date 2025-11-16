app.jsx

// import { Provider } from "@/components/ui/provider"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './pages/signup';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  VStack,
  SimpleGrid,
  Input,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
} from "@chakra-ui/react";
import { FaShoppingCart, FaFacebook, FaInstagram } from "react-icons/fa";

import './App.css'

function App() {

  return (
    <>
    <Signup></Signup>
     <Box>
      {/* Navbar */}
      <Flex as="nav" p={4} justify="space-between" align="center" bg="green.100">
        <Heading size="md">🌿 Plant Store</Heading>
        <HStack spacing={6}>
          <Text cursor="pointer">Home</Text>
          <Text cursor="pointer">Shop</Text>
          <Text cursor="pointer">About</Text>
          <Text cursor="pointer">Contact</Text>
          <IconButton icon={<FaShoppingCart />} aria-label="Cart" />
        </HStack>
      </Flex>

      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        p={10}
        bg="green.50"
      >
        <Heading size="2xl">Bring Nature Home 🌱</Heading>
        <Text fontSize="lg" mt={4}>
          Explore our collection of fresh indoor plants.
        </Text>
        <HStack spacing={4} mt={6}>
          <Button colorScheme="green">Shop Now</Button>
          <Button variant="outline" colorScheme="green">
            Learn More
          </Button>
        </HStack>
      </Flex>

      {/* Sidebar + Main Section */}
      <Flex p={10} gap={6}>
        {/* Sidebar */}
        <VStack align="start" w="250px" spacing={6}>
          <Heading size="sm">Filter by Category</Heading>
          <Checkbox>Indoor</Checkbox>
          <Checkbox>Outdoor</Checkbox>
          <Checkbox>Succulents</Checkbox>
          <Checkbox>Flowering</Checkbox>

          <Heading size="sm">Price Range</Heading>
          <Slider defaultValue={30} min={0} max={100}>
            <SliderTrack>
              <SliderFilledTrack bg="green.400" />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Input placeholder="Search plants..." />
        </VStack>

        {/* Main Section */}
        <SimpleGrid columns={3} spacing={6} flex="1">
          <Box border="1px solid" borderRadius="md" p={4}    _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
  transition="0.2s">
            <Image
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              alt="Plant"
              borderRadius="md"
            />
            <Text mt={2} fontWeight="bold">
              Aloe Vera
            </Text>
            <Text>$12</Text>
            <Button mt={2} colorScheme="green">
              Add to Cart
            </Button>
          </Box>
          {/* Repeat similar cards for other plants */}
        </SimpleGrid>
      </Flex>

      {/* Footer */}
      <Flex as="footer" p={6} bg="green.100" justify="space-between">
        <Text>© 2025 Plant Store. All rights reserved.</Text>
        <HStack>
          <IconButton icon={<FaFacebook />} aria-label="Facebook" />
          <IconButton icon={<FaInstagram />} aria-label="Instagram" />
        </HStack>
      </Flex>
    </Box>
    
    </>
  )
}

export default App



// singup
import React, { useState } from "react";
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, Flex } from "@chakra-ui/react";
import Lottie from "lottie-react";
import plantAnimation from "../animations/Girl.json";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';


function Signup() {
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    password: "",
  })
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => {
    if (!form.firstname || !form.email || !form.phone || !form.password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    console.log("Form submitted:", form);
  };
   useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);


  return (
    <Flex
      minH="100vh"
      w="100%"
      bg="green.100"
      direction={["column", "column", "row"]} // column on small screens, row on large
    >
      {/* Left side: animation */}
      <Flex flex={1} align="center" justify="center" mb={[8, 8, 0]} /* margin bottom on small screens */>
        <Box maxW={["80%", "60%", "500px"]}>
          <Lottie animationData={plantAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
        </Box>
      </Flex>

      {/* Right side: form */}
      <Flex flex={1} align="center" justify="center">
        <Box maxW="md" w="full" p={8} borderWidth="1px" borderRadius="lg" bg="white" shadow="lg">
          <Heading textAlign="center" size="lg" mb={6} color="green.600">
            Sign Up
          </Heading>

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

            <Button colorScheme="green" w="full" onClick={onSubmit}>
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Signup;


https://res.cloudinary.com/dhki07yuv/image/upload/v1756065578/sample.jpg