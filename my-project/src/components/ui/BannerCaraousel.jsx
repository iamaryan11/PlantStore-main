import React from "react";
import Slider from "react-slick";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

const banners = [
  {
    src: "/images/worksone.jpg",
    title: "Fresh Indoor Plants",
    subtitle: "Bring nature into your home",
  },
  {
    src: "/images/workstwo.jpg",
    title: "Outdoor Garden Collection",
    subtitle: "Beautify your garden with greenery",
  },
  {
    src: "/images/worksthree.jpg",
    title: "Succulents & Cacti",
    subtitle: "Low maintenance, high style",
  },
  {
    src: "/images/First.webp",
    title: "Exotic Plant Species",
    subtitle: "Add uniqueness to your space",
  },
];

export default function BannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <Box w="full" maxH="500px" overflow="hidden" my={1} position="relative">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <Box key={index} w="full" position="relative">
            {/* Banner Image */}
            <Image
              src={banner.src}
              alt={`banner-${index}`}
              objectFit="cover"
              w="full"
              h={["250px", "350px", "500px"]}
            />

            {/* Greenish Overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              w="full"
              h="full"
              bg="green.700"
              opacity={0.4}
            />

            {/* Text Overlay */}
            <VStack
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              spacing={3}
              color="white"
              textAlign="center"
            >
              <Text fontSize={["xl", "2xl", "4xl"]} fontWeight="bold">
                {banner.title}
              </Text>
              <Text fontSize={["sm", "md", "xl"]}>{banner.subtitle}</Text>
            </VStack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
