import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, HStack, Spacer, Heading, Button } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={3} color="white">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Heading as="h1" size="lg">
            <RouterLink to="/">Plant Store</RouterLink>
          </Heading>
        </HStack>
        <Spacer />
        <HStack as="nav" spacing={4}>
          <Button as={RouterLink} to="/" variant="ghost" color="whiteAlpha.900">
            Home
          </Button>
          <Button as={RouterLink} to="/admin/login" variant="ghost" color="whiteAlpha.900">
            Admin Login
          </Button>
          <Button as={RouterLink} to="/admin/register" variant="ghost" color="whiteAlpha.900">
            Admin Register
          </Button>
          <Button as={RouterLink} to="/login" variant="ghost" color="whiteAlpha.900">
            User Login
          </Button>
          <Button as={RouterLink} to="/signup" variant="ghost" color="whiteAlpha.900">
            User Signup
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
