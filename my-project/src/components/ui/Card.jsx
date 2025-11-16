import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../cartSlice";

export default function ProductCard({ product }) {
  const { name, price, categories, inStock, imageUrl, _id } = product;
  const { isAuthenticated } = useSelector((state) => state.auth);
  // console.log("hey", product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in.",
        description: "You must be logged in to add items to your cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }
    await dispatch(addToCart({ plantId: _id, quantity: 1 }));

    toast({
      title: "Added to cart!",
      description: `${name} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="green.50"
      shadow="md"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.03)", shadow: "lg" }}
    >
      {imageUrl && (
        <Image src={imageUrl} alt={name} objectFit="cover" w="full" h={48} />
      )}

      <VStack align="start" p={4} spacing={2}>
        <Text fontWeight="bold" fontSize="lg" color="green.800">
          {name}
        </Text>
        <Text fontSize="md" color="green.600">
          ₹{price}
        </Text>
        <HStack spacing={2}>
          {categories.map((cat, idx) => (
            <Badge key={idx} colorScheme="green">
              {cat}
            </Badge>
          ))}
        </HStack>
        <Text fontSize="sm" color={inStock ? "green.700" : "red.500"}>
          {inStock ? "In Stock" : "Out of Stock"}
        </Text>
        <Button
          colorScheme="green"
          size="sm"
          w="full"
          onClick={handleAddToCart}
          isDisabled={!inStock}
        >
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
}
