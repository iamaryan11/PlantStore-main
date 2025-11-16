import React, { useState } from "react";
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
  Flex,
  Checkbox,
  Link,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

const ADD_PLANT_URL = "http://localhost:3000/adminrightss/addplants";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const toast = useToast();

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories([...categories, trimmedCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const payload = {
        name,
        price: parseFloat(price),
        categories,
        inStock,
        imageUrl,
      };

      const response = await axios.post(ADD_PLANT_URL, payload, {
        withCredentials: true,
      });

      if (response.status === 201) {
        setStatusMessage(response.data);
        toast({
          title: "Plant Added!",
          description:
            "A new plant has been successfully added to the database.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setName("");
        setPrice("");
        setCategories([]);
        setNewCategory("");
        setInStock(true);
        setImageUrl("");
      }
    } catch (error) {
      setIsError(true);
      console.error("Error adding plant:", error);

      let errorMessage = "An error occurred while adding the plant.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data;
      }
      setStatusMessage(errorMessage);
      toast({
        title: "Failed to Add Plant",
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
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
      <Box
        p={8}
        maxWidth="600px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading as="h2" size="xl" textAlign="center" color="teal.500">
            Admin Dashboard
          </Heading>
          <Text textAlign="center" color="gray.600">
            Welcome! Add a new plant to the inventory below.
          </Text>

          {/* Plant Name Input */}
          <FormControl id="name" isRequired>
            <FormLabel>Plant Name</FormLabel>
            <Input
              type="text"
              placeholder="e.g., Fiddle Leaf Fig"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          {/* Price Input */}
          <FormControl id="price" isRequired>
            <FormLabel>Price (Rs)</FormLabel>
            <Input
              type="number"
              placeholder="e.g., 25.50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          {/* Categories Input */}
          <FormControl id="categories" isRequired>
            <FormLabel>Categories</FormLabel>
            <HStack flexWrap="wrap" spacing={2} mb={2}>
              {categories.map((cat, index) => (
                <Tag key={index} size="md" variant="solid" colorScheme="teal">
                  <TagLabel>{cat}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveCategory(cat)} />
                </Tag>
              ))}
            </HStack>
            <HStack>
              <Input
                type="text"
                placeholder="Add a category (e.g., Indoor)"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <Button onClick={handleAddCategory} colorScheme="teal">
                Add
              </Button>
            </HStack>
          </FormControl>

          {/* In Stock Checkbox */}
          <FormControl id="inStock">
            <Checkbox
              isChecked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            >
              In Stock
            </Checkbox>
          </FormControl>

          {/* Image URL Input */}
          <FormControl id="imageUrl">
            <FormLabel>Image URL</FormLabel>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isLoading}
            mt={4}
          >
            Add New Plant
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default AdminDashboard;
