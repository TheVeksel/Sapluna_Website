import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../common/Loader";

export default function Page() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section style={{ minHeight: "100vh" }}>
      {isLoading && <Loader />}
      <iframe
        onLoad={() => setIsLoading(false)}
        src={`https://sapluna.com/${slug}`}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </section>
  );
}