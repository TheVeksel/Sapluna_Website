/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/wpApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: number;
  slug: string;
  acf: {
    [key: string]: any;
  };
}

const wpApi = createApi({
  reducerPath: 'wpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sapluna.com/wp-json/wp/v2/',
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => `posts?per_page=100&_fields=id,slug,acf`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Posts' as const, id })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostBySlug: builder.query<Post[], string>({
      query: (slug) => `posts?slug=${slug}&_fields=id,slug,acf`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Posts' as const, id }))
          : [{ type: 'Posts', id: 'SINGLE' }],
    }),
  }),
});

export const { useGetAllPostsQuery, useGetPostBySlugQuery, usePrefetch } = wpApi;
export default wpApi;