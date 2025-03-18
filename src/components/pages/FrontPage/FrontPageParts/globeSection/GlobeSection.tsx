import "./GlobeSection.scss";
import GlobeCard from "./GlobeCard";

export default function GlobeSection() {
  return (
    <section className="globe">
      <div className="wrapper">
        <h2 className="globe__title">
          Monipuolisia ominaisuuksia yms jne.
        </h2>
        <ul className="globe__list">
          <GlobeCard
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris augue, pellentesque facilisis tincidunt vitae."
            />
          <GlobeCard
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris augue, pellentesque facilisis tincidunt vitae."
            />
          <GlobeCard
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris augue, pellentesque facilisis tincidunt vitae."
            />
          <GlobeCard
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris augue, pellentesque facilisis tincidunt vitae."
            />
          <GlobeCard
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris augue, pellentesque facilisis tincidunt vitae."
            />
          <GlobeCard
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris augue, pellentesque facilisis tincidunt vitae."
            />
        </ul>
      </div>
    </section>
  )
}