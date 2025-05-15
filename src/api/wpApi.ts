/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/wpApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  content: any;
  id: number;
  slug: string;
  title: { rendered: string };
  date: string;
  acf: { [key: string]: any };
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

const wpApi = createApi({
  reducerPath: "wpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sapluna.com/wp-json/wp/v2/",
  }),
  tagTypes: ["Posts", "Products"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => `posts?per_page=100&_fields=id,slug,acf`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
      keepUnusedDataFor: 3600,
    }),

    getPostBySlug: builder.query<Post[], string>({
      query: (slug) => `posts?slug=${slug}&_fields=id,slug,acf`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Posts" as const, id }))
          : [{ type: "Posts", id: "SINGLE" }],
      keepUnusedDataFor: 3600,
    }),

    getProductBySlug: builder.query<Post[], string>({
      query: (slug) => `product?slug=${slug}&_fields=id,slug,acf`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Products" as const, id }))
          : [{ type: "Products", id: "SINGLE" }],
      keepUnusedDataFor: 3600,
    }),
    getBlogPostBySlug: builder.query<Post[], string>({
      query: (slug) =>
        `posts?slug=${slug}&_fields=id,slug,acf,title,content,date&categories=76`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Posts" as const, id }))
          : [{ type: "Posts", id: "BLOG_SINGLE" }],
      keepUnusedDataFor: 3600,
    }),
    getAllBlogPosts: builder.query<Post[], void>({
      query: () =>
        `posts?per_page=100&_embed&categories=76&orderby=date&order=desc`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "BLOG_LIST" },
            ]
          : [{ type: "Posts", id: "BLOG_LIST" }],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
  useGetProductBySlugQuery,
  useGetBlogPostBySlugQuery,
  useGetAllBlogPostsQuery,
  usePrefetch,
} = wpApi;

export default wpApi;
