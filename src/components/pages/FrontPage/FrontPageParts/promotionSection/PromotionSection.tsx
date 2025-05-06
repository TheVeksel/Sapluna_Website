import "./PromotionSection.scss";
import Title from "../../../../common/title/Title";
import { useRef, useEffect, useState } from "react";

const originalImages = [
  "/img/photos/carousel/Dia1.JPG",
  "/img/photos/carousel/Dia2.JPG",
  "/img/photos/carousel/Dia3.JPG",
  "/img/photos/carousel/Dia4.JPG",
  "/img/photos/carousel/Dia5.JPG",
  "/img/photos/carousel/Dia6.JPG",
  "/img/photos/carousel/Dia7.JPG",
  "/img/photos/carousel/Dia8.JPG",
  "/img/photos/carousel/Dia9.JPG",
  "/img/photos/carousel/Dia10.JPG",
  "/img/photos/carousel/Dia11.JPG",
  "/img/photos/carousel/Dia12.JPG",
  "/img/photos/carousel/Dia13.JPG",
  "/img/photos/carousel/Dia14.JPG",
  "/img/photos/carousel/Dia15.JPG",
  "/img/photos/carousel/Dia16.JPG",
  "/img/photos/carousel/Dia17.JPG",
  "/img/photos/carousel/Dia1.JPG",
  "/img/photos/carousel/Dia2.JPG",
  "/img/photos/carousel/Dia3.JPG",
  "/img/photos/carousel/Dia4.JPG",
  "/img/photos/carousel/Dia5.JPG",
  "/img/photos/carousel/Dia6.JPG",
  "/img/photos/carousel/Dia7.JPG",
  "/img/photos/carousel/Dia8.JPG",
  "/img/photos/carousel/Dia9.JPG",
  "/img/photos/carousel/Dia10.JPG",
  "/img/photos/carousel/Dia11.JPG",
  "/img/photos/carousel/Dia12.JPG",
  "/img/photos/carousel/Dia13.JPG",
  "/img/photos/carousel/Dia14.JPG",
  "/img/photos/carousel/Dia15.JPG",
  "/img/photos/carousel/Dia16.JPG",
  "/img/photos/carousel/Dia17.JPG",
  "/img/photos/carousel/Dia1.JPG",
];

const images = [
  originalImages[originalImages.length - 1],
  ...originalImages,
  originalImages[0]
];

export default function PromotionSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 2950);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLDivElement>(".carousel-item");
    const currentItem = items[currentIndex];
    if (!currentItem) return;

    const containerWidth = el.getBoundingClientRect().width;
    const itemWidth = currentItem.getBoundingClientRect().width;
    const scrollLeft = currentItem.offsetLeft - (containerWidth - itemWidth) / 2;

    el.scrollTo({
      left: scrollLeft,
      behavior: "smooth"
    });

    if (currentIndex === images.length - 1) {
      setTimeout(() => {
        if (!carouselRef.current) return;
        const firstItem = items[1];
        const containerWidth = el.getBoundingClientRect().width;
        const itemWidth = firstItem.getBoundingClientRect().width;
        const scrollLeft = firstItem.offsetLeft - (containerWidth - itemWidth) / 2;

        el.scrollTo({ left: scrollLeft, behavior: "auto" });
        setCurrentIndex(1);
      }, 350);
    }
  }, [currentIndex]);

  return (
    <section className="promotion">
      <div className="heading">
        <Title>Sapluna: Malli ohjaa - sinä johdat</Title>
      </div>
      <p className="promotion__text">
        Esivalmisteltu malli toimii projektin ohjenuorana, jaettuna pieniin, hallittaviin prosesseihin. Se määrittelee, mitä, miten ja milloin tehdään, jotta lopputulos on ennakoitava ja toistettava. Sinä johdat, malli huolehtii rakenteesta.
      </p>
      <div className="promotion__carousel" ref={carouselRef}>
        {images.map((src, index) => (
          <div key={index} className="carousel-item">
            <img src={src} alt={`img-${index}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
