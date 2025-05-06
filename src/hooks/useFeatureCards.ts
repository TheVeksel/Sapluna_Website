import { useGetAllPostsQuery, useGetPostBySlugQuery} from "../api/wpApi";
import { useState, useEffect } from "react";

interface FeatureCard {
  image: string;
  title: string;
  text: string;
}

export const useFeaturesCards = () => {
  const slug = "ominaisuudet";
  const [showLoader, setShowLoader] = useState(true);

  const {
    data: postFromAll,
    isLoading: isAllLoading,
  } = useGetAllPostsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      data: data?.find((post) => post.slug === slug),
      isLoading,
      isFetching,
    }),
  });

  const {
    data: singlePostArray,
    isLoading: isSingleLoading,
  } = useGetPostBySlugQuery(slug || "", {
    skip: !!postFromAll,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setShowLoader(true);

    const isLoading = isAllLoading || isSingleLoading;

    if (!isLoading) {
      timer = setTimeout(() => setShowLoader(false), 400);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAllLoading, isSingleLoading]);

  const post = postFromAll || singlePostArray?.[0];
  const cards: FeatureCard[] = post?.acf?.features
    ? (Object.values(post.acf.features) as FeatureCard[])
    : [];

  return {
    cards,
    isLoading: showLoader, // Используем showLoader вместо прямой проверки
  };
};