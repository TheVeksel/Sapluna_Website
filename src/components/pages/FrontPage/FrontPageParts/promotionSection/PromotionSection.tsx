import "./PromotionSection.scss";
import Title from "../../../../common/title/Title";
import { useRef, useEffect, useState } from "react";

const originalImages = [
  "img/photos/team.png",
  "img/photos/työskentelytilaa.png",
  "img/photos/team.png",
  "img/photos/työskentelytilaa.png",
  "img/photos/team.png"
];

const images = [
  originalImages[originalImages.length - 1],
  ...originalImages,
  originalImages[0]
];

export default function PromotionSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Автопрокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 2250);

    return () => clearInterval(interval);
  }, []);

  // Скролл в центр активного элемента
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
        <Title>Otsikko Saplunasta</Title>
      </div>
      <p className="promotion__text">
        Teksti Saplunasta Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Ducimus, voluptates, ipsam nam ex, consequuntur quia laboriosam
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
