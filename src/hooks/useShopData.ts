import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import {
  ProductCategory,
  useGetAllProductCategoriesQuery,
  useGetAllProductsViaCategoryIdQuery,
} from '../api/wpApi';
import { Product } from '../components/pages/PricingPage/PopUps/OrderPopUp';

interface UseShopDataProps {
  categoryId?: number;
  categorySlug?: string;
}

interface PriceCalculation {
  originalPrice: number;
  currentPrice: number;
  hasDiscount: boolean;
  discountPercentage?: number;
}

interface UseShopDataReturn {
  // Data
  categories: ProductCategory[];
  filteredCategories: ProductCategory[];
  currentCategory: ProductCategory | null;
  products: Product[];
  filteredProducts: Product[];
  
  // States
  searchQuery: string;
  isProductsLoading: boolean;
  isCategoriesLoading: boolean;
  
  // Actions
  handleSearchChange: (query: string) => void;
  handleAddToCart: (product: Product) => void;
  
  // Utility functions
  calculatePrice: (product: Product) => PriceCalculation;
}

export const useShopData = ({ 
  categoryId, 
  categorySlug 
}: UseShopDataProps = {}): UseShopDataReturn => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  // Categories query
  const { 
    data: categories = [], 
    isLoading: catsLoading
  } = useGetAllProductCategoriesQuery();

  // Filter categories
  const filteredCategories = useMemo(
    () => categories.filter((cat) => cat.slug !== "uncategorized"),
    [categories]
  );

  // Current category logic
  const currentCategory = useMemo(() => {
    if (categorySlug) {
      return filteredCategories.find(cat => cat.slug === categorySlug) || null;
    }
    if (categoryId) {
      return filteredCategories.find(cat => cat.id === categoryId) || null;
    }
    // Default category for main shop page
    return filteredCategories.find(cat => cat.id === 140) || null;
  }, [filteredCategories, categoryId, categorySlug]);

  // Products query
  const { 
    data: products = [], 
    isLoading: prodsLoading,
    isFetching: prodsFetching
  } = useGetAllProductsViaCategoryIdQuery(currentCategory?.id ?? 0, {
    skip: !currentCategory?.id,
  });

  // Reset products when category changes
  useEffect(() => {
    if (currentCategory?.id) {
      setLocalProducts([]);
    }
  }, [currentCategory?.id]);

  // Process products
  useEffect(() => {
    if (!prodsFetching && products.length > 0) {
      const validProducts = products.filter(
        (p) => p.slug !== "hinnoittelu" && p.id !== 8468 && p.acf?.hinta
      );
      
      // Randomize products
      const randomized = [...validProducts].sort(() => Math.random() - 0.5);
      setLocalProducts(randomized);
    }
  }, [prodsFetching, products]);

  // Search with debounce
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return localProducts;
    
    const query = searchQuery.toLowerCase().trim();
    return localProducts.filter((product) =>
      product.title?.rendered?.toLowerCase().includes(query)
    );
  }, [localProducts, searchQuery]);

  // Price calculation utility 
  const calculatePrice = useCallback((product: Product): PriceCalculation => {
    const originalPrice = parseFloat(String(product.acf?.hinta || "0"));
    const hasDiscount = product.acf?.alennus === "On";
    const discountPrice = parseFloat(String(product.acf?.alennushinta || "0"));
    const currentPrice = hasDiscount ? discountPrice : originalPrice;
    
    const result: PriceCalculation = {
      originalPrice,
      currentPrice,
      hasDiscount,
    };

    if (hasDiscount && originalPrice > 0 && discountPrice > 0) {
      const discountPercentage = Math.round(
        ((originalPrice - currentPrice) / originalPrice) * 100
      );
      result.discountPercentage = discountPercentage;
    }

    return result;
  }, []);

  // Handlers
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    try {
      const { currentPrice } = calculatePrice(product);
      
      dispatch(
        addItem({
          id: product.id,
          name: product.title?.rendered || 'Product without name',
          price: currentPrice,
          type: "product",
          image: product.acf?.image || '',
          quantity: 1,
        })
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [dispatch, calculatePrice]);

  return {
    // Data
    categories,
    filteredCategories,
    currentCategory,
    products: localProducts,
    filteredProducts,
    
    // States
    searchQuery,
    isProductsLoading: prodsLoading || prodsFetching,
    isCategoriesLoading: catsLoading,
    
    // Actions
    handleSearchChange,
    handleAddToCart,
    
    // Utility functions
    calculatePrice,
  };
};