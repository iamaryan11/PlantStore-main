import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  VStack,
  Text,
  Spinner,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import axios from "axios";

const CHAT_API_URL = "https://urvan-2.onrender.com/Ai/chatwithai";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      role: "user",
      parts: [{ text: input }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const backendMessages = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: msg.parts.map((part) => ({ text: part.text })),
      }));

      const payload = { messages: [...backendMessages, userMessage] };

      const response = await axios.post(CHAT_API_URL, payload, {
        withCredentials: true,
      });

      const aiMessage = {
        role: "model",
        parts: [{ text: response.data.message }],
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error sending message to AI:", err);

      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Request setup error:", err.message);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "Sorry, I'm having trouble connecting right now." }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box position="fixed" bottom="4" right="4">
      <IconButton
        isRound={true}
        colorScheme="teal"
        aria-label="Chat with AI"
        icon={<ChatIcon />}
        size="lg"
        boxShadow="lg"
        onClick={() => setIsOpen(true)}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="teal.500" color="white">
            AI Plant Assistant
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack
              spacing={4}
              align="stretch"
              h="400px"
              overflowY="auto"
              p={2}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}
                  bg={msg.role === "user" ? "blue.100" : "gray.100"}
                  borderRadius="lg"
                  p={3}
                  maxW="70%"
                >
                  <Text>{msg.parts[0].text}</Text>
                </Box>
              ))}
              {isLoading && (
                <Flex justify="center" p={2}>
                  <Spinner size="sm" />
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>
            <HStack mt={4}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                colorScheme="teal"
                onClick={handleSendMessage}
                isLoading={isLoading}
              >
                Send
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Chatbot;
