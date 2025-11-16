import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ProductCard from "./Card"; 

export default function FeaturedPlants({ products = [] }) {

  if (!products.length) return null;

  return (
    <Box bg="green.50" py={10}>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mb={6}
        color="green.800"
      >
        Featured Plants
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={6} px={6}>
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            product={{
              name: product.name || "Unknown",
              price: product.price || 0,
              categories: product.categories || [],
              inStock: product.inStock ?? true,
              image: product.image || "/images/default.jpg",
            }}
            onAddToCart={() => {}}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
