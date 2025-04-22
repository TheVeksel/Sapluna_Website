import wpApi from "../wpApi"; 

interface SolutionPost {
  id: number;
  slug: string;
  acf: {
    [slug: string]: {
      main_titles: {
        title_1: string;
        title_2: string;
        text_1: string;
        "text_1-2": string;
        text_2: string;
        "text_2-2": string;
      };
    };
  };
}


const solutionsApi = wpApi.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query<SolutionPost[], string>({
      query: (slug) => `posts?slug=${slug}&_fields=id,slug,acf`,
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetPageContentQuery } = solutionsApi;