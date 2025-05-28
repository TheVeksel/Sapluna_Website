import { useState, useEffect } from "react";
import { useGetPosts } from "./useGetPosts";

interface FeatureCard {
  image: string;
  title: string;
  text: string;
}

export const useFeaturesCards = () => {
  const slug = "ominaisuudet";
  const [showLoader, setShowLoader] = useState(true);
  
  const { data, isLoading } = useGetPosts(slug);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setShowLoader(true);

    if (!isLoading) {
      timer = setTimeout(() => setShowLoader(false), 400);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  const cards: FeatureCard[] = data?.acf?.features
    ? (Object.values(data.acf.features) as FeatureCard[])
    : [];

  return {
    cards,
    isLoading: showLoader, 
  };
};