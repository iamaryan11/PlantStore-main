import React from "react";
import { Box } from "@chakra-ui/react";
// import Navbar from "../components/ui/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerCarousel from "../components/ui/BannerCaraousel";
import ProductGrid from "./ProductGrid";
import Footer from "../components/ui/Footer";
import NewsletterSubscription from "../components/ui/NewsletterSubscription";
import FeaturedPlants from "../components/ui/FeaturedPlants";
import Chatbot from "../components/ui/Chatbot"; 

const featuredProducts = [
  { name: "Aloe Vera", price: 250, categories: ["Indoor"], inStock: true, image: "/images/aloe-vera.jpg" },
  { name: "Money Plant", price: 150, categories: ["Indoor"], inStock: true, image: "/images/money-plant.jpg" },
  { name: "Snake Plant", price: 300, categories: ["Indoor"], inStock: true, image: "/images/snake-plant.jpg" },
];

export default function Homepage() {
  return (
    <Box bg="green.100" minH="100vh">
      
      <BannerCarousel />
      <ProductGrid />
      <FeaturedPlants products={featuredProducts} />
      <NewsletterSubscription />
      <Footer></Footer>
      <Chatbot />  
    </Box>
  );
}