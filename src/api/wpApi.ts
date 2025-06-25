// src/api/wpApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../components/pages/PricingPage/PopUps/OrderPopUp";

interface Post {
  content: unknown;
  id: number;
  slug: string;
  title: { rendered: string };
  date: string;
  acf: { [key: string]: unknown };
  featured_media?: number;
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  acf?: { [key: string]: unknown };
}

const wpApi = createApi({
  reducerPath: "wpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sapluna.com/wp-json/wp/v2/",
  }),
  tagTypes: ["Posts", "Products", "ProductCategories"],
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
        `posts?slug=${slug}&_fields=id,slug,acf,title,content,date&`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Posts" as const, id }))
          : [{ type: "Posts", id: "BLOG_SINGLE" }],
      keepUnusedDataFor: 3600,
    }),
    getAllBlogPosts: builder.query<Post[], void>({
      query: () =>
        `posts?per_page=100&_embed=wp:featuredmedia,wp:term&categories=76&orderby=date&order=desc&_fields=id,slug,acf,title,date,_links,_embedded`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "BLOG_LIST" },
            ]
          : [{ type: "Posts", id: "BLOG_LIST" }],
      keepUnusedDataFor: 3600,
    }),
    getAllProductsViaCategoryId: builder.query<Product[], number>({
      query: (id) =>
        `product?product_cat=${id}&_embed=1&_fields=id,slug,title,content,acf&exclude=8468`,
      providesTags: (result) => [
        { type: "Products", id: "LIST" },
        ...(result?.map(({ id }) => ({ type: "Products" as const, id })) || []),
      ],
      keepUnusedDataFor: 3600,
    }),

    getAllProductCategories: builder.query<ProductCategory[], void>({
      query: () =>
        `product_cat?_fields=id,name,slug,acf&per_page=100&orderby=name&order=asc&exclude=37`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "ProductCategories" as const,
                id,
              })),
              { type: "ProductCategories", id: "LIST" },
            ]
          : [{ type: "ProductCategories", id: "LIST" }],
      keepUnusedDataFor: 3600,
    }),
    getShopProductBySlug: builder.query<Product[], string>({
      query: (slug) =>
        `product?slug=${slug}&product_cat_embed=1&_fields=id,slug,title,content,acf`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Products" as const, id }))
          : [{ type: "Products", id: "SINGLE" }],
      keepUnusedDataFor: 3600,
    }),

    getAllProducts: builder.query<Product[], void>({
      query: () =>
        `product?product_cat_embed=1&_fields=id,slug,title,content,acf&exclude=8468`,
      providesTags: (result) => [
        { type: "Products", id: "LIST" },
        ...(result?.map(({ id }) => ({ type: "Products" as const, id })) || []),
      ],
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
  useGetAllProductsViaCategoryIdQuery,
  useGetAllProductsQuery,
  useGetAllProductCategoriesQuery,
  useGetShopProductBySlugQuery,
  usePrefetch,
} = wpApi;

export default wpApi;
