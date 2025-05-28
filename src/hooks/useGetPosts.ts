import { useGetAllPostsQuery, useGetPostBySlugQuery } from "../api/wpApi";
import { useEffect, useRef } from "react";

export const useGetPosts = (slug: string) => {
  const previousSlug = useRef<string | null>(null);
  
  const {
    data: postFromAll,
    isLoading: isAllLoading,
    isFetching: isAllFetching,
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
    isFetching: isSingleFetching,
    refetch: refetchSinglePost,
  } = useGetPostBySlugQuery(slug, {
    skip: !!postFromAll || !slug, // Skip if data already in AllPosts or no slug
  });

  // on slug change resetting data
  useEffect(() => {
    if (slug && previousSlug.current !== slug) {
      previousSlug.current = slug;
      if (!postFromAll) {
        refetchSinglePost();
      }
    }
  }, [slug, postFromAll, refetchSinglePost]);

  const data = postFromAll || singlePostArray?.[0];
  
  return {
    data,
    isLoading: isAllLoading || isSingleLoading,
    isFetching: isAllFetching || isSingleFetching,
  };
};