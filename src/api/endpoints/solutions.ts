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
      sapluna_history: {
        history_image: string;
        history_title: string;
        history_text: string;
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