import React from "react";
import { Box, Stack, Text, Link, HStack, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="green.600" color="white" py={10} px={6}>
      <Stack
        direction={["column", "row"]}
        spacing={8}
        justify="space-between"
        align={["flex-start", "center"]}
      >
       
        <VStack align="flex-start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg">
            PlantStore
          </Text>
          <Text fontSize="sm">
            Your one-stop shop for indoor and outdoor plants, pots, and gardening essentials.
          </Text>
        </VStack>

        <VStack align="flex-start">
          <Text fontWeight="bold" fontSize="md">
            Quick Links
          </Text>
          <Link href="/" _hover={{ textDecoration: "underline" }}>
            Home
          </Link>
          <Link href="/about" _hover={{ textDecoration: "underline" }}>
            About
          </Link>
          <Link href="/contact" _hover={{ textDecoration: "underline" }}>
            Contact
          </Link>
          <Link href="/cart" _hover={{ textDecoration: "underline" }}>
            My Cart
          </Link>
        </VStack>

      
        <VStack align="flex-start">
          <Text fontWeight="bold" fontSize="md">
            Contact
          </Text>
          <Text fontSize="sm">Email: support@plantstore.com</Text>
          <Text fontSize="sm">Phone: +91 12345 67890</Text>
          <Text fontSize="sm">Address: 123 Green Lane, Plant City</Text>
        </VStack>
      </Stack>

     
      <Text textAlign="center" fontSize="sm" mt={8}>
        &copy; {new Date().getFullYear()} PlantStore. All rights reserved.
      </Text>
    </Box>
  );
}
