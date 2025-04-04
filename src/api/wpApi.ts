import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const wpApi = createApi({
  reducerPath: 'wpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sapluna.com/wp-json/wp/v2/',
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (endpoint: string) => endpoint,
    }),
  }),
});

export const { useGetDataQuery } = wpApi;
export default wpApi;