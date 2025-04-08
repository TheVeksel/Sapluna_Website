import wpApi from "../wpApi";

interface ContactPost {
  id: number;
  slug: string;
  acf: {
    contact_info: {
        phone_number: string;
        email: string;
        address: string;
    }
  }
}


const contactsApi = wpApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<ContactPost[], void>({
      query: () => 'posts?slug=contacts-info',
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetContactsQuery, usePrefetch } = contactsApi;
