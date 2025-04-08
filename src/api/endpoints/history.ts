import wpApi from "../wpApi";

interface SaplunaHistory {
  id: number;
  slug: string;
  acf: {
    sapluna_history: {
      history_image: string;
      history_title: string;
      history_text: string;
    };
  };
}

const historyApi = wpApi.injectEndpoints({
  endpoints: (builder) => ({
    GetHistory: builder.query<SaplunaHistory[], void>({
      query: () => "posts?slug=sapluna-history",
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetHistoryQuery, usePrefetch } = historyApi;
