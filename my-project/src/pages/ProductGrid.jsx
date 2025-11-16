import React, { useEffect, useState, useRef } from "react";
import { 
    SimpleGrid,
    Spinner,
    Center,
    Text,
    VStack,
    HStack,
    Button,
    Input,
    Select,
    Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ui/Card";
import { fetchPlants } from "../plantSlice";

const categories = ['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Flowering', 'Home Decor', 'Low Maintenance', 'Hanging', 'Desk Plant'];

function ProductGrid() {
    const dispatch = useDispatch();
    const { list: plants, loading, error, totalPages } = useSelector(state => state.plants);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const searchRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        dispatch(fetchPlants({
            page: currentPage,
            limit: 9,
            search: debouncedSearchTerm,
            category: selectedCategory
        }));
    }, [dispatch, currentPage, debouncedSearchTerm, selectedCategory]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };
    
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return <Text color="red.500" textAlign="center">{error}</Text>;
    }

    // New return statement with the simplified layout
    return (
        <VStack spacing={6} p={4} maxW="1200px" mx="auto">
            {/* Search and Filter UI at the top, centered */}
            <HStack w="full" maxW="4xl" mt={4} spacing={4}>
                <Input
                    ref={searchRef}
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    bg="green.300"
                />
                <Select
                    placeholder="Filter by category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    bg="green.300"

                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Select>
            </HStack>
            
            {/* Products below the search bar */}
            {plants.length === 0 ? (
                <Text textAlign="center" mt={8}>No plants available matching your criteria.</Text>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={8}>
                    {plants.map((plant) => (
                        <ProductCard key={plant._id} product={plant} />
                    ))}
                </SimpleGrid>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
                <HStack spacing={4} pb={8} justify="center" mt={8}>
                    <Button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            variant={currentPage === page ? "solid" : "outline"}
                            colorScheme="green"
                        >
                            {page}
                        </Button>
                    ))}
                    
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        isDisabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </HStack>
            )}
        </VStack>
    );
}

export default ProductGrid;