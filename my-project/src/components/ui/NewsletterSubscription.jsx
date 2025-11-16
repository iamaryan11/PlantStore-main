import React from "react";
import { Box, Text, Input, Button, HStack } from "@chakra-ui/react";

export default function NewsletterSubscription() {
  const handleSubscribe = () => {
    alert("Thank you for subscribing!");
  };

  return (
    <Box bg="green.100" py={10} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Subscribe to our Newsletter
      </Text>
      <Text mb={4}>Get the latest offers and plant care tips directly in your inbox.</Text>
      <HStack
        maxW="md"
        mx="auto"
        spacing={2}
        flexDirection={["column", "row"]}
      >
        <Input
          placeholder="Enter your email"
          bg="white"
          size="md"
          _placeholder={{ color: "gray.400" }}
        />
        <Button colorScheme="green" size="md" onClick={handleSubscribe}>
          Subscribe
        </Button>
      </HStack>
    </Box>
  );
}
