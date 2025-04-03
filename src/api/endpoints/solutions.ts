import wpApi from "../wpApi";

export interface SolutionPost {
  id: number;
  slug: string;
  acf: {
    [slug: string]: {
      main_titles: {
        title_1: string;
        title_2: string;
        text_1: string;
        text_2: string;
      };
    };
  };
}

const solutionsApi = wpApi.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query<SolutionPost[], string>({ 
      query: (slug) => `posts?slug=${slug}`,
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetPageContentQuery } = solutionsApi;