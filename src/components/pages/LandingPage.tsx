
import { useParams } from "react-router-dom";

export default function Page() {
  const { slug } = useParams();

  return (
    <section style={{ minHeight: "100vh" }}>
      <iframe
        src={`https://sapluna.com/${slug}`}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </section>
  );
}