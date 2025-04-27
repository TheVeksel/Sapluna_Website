import { useGetPostBySlugQuery } from "../../../../api/wpApi";
import { useGetContactsQuery } from "../../../../api/endpoints/contacts";

interface PricingData {
  contact_texts: {
    title: string;
    text: string;
  };
}
export default function PricingContact() {
  const { data: pageData, isLoading } = useGetPostBySlugQuery("pricing-page");
  const { data: contactsData } = useGetContactsQuery();

  const acf = pageData?.[0]?.acf as PricingData;
  const contactInfo = contactsData?.[0]?.acf?.contact_info;

  if (isLoading) return null;
  const email = contactInfo?.emails?.sales_email;
  return (
    <div className="pricing-section__contacts">
      <div className="pricing-section__contacts-heading">
        <h2>{acf.contact_texts.title}</h2>
      </div>
      <p>{acf.contact_texts.text}</p>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
}
