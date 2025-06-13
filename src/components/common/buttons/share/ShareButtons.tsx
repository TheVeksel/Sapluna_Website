import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from 'react-share';
import { useState } from 'react';
import './Share.scss'

export default function ShareButtons({ title, url }: { title: string, url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Kopiointi epäonnistui. Yritä uudelleen.");
    }
  };

  return (
    <div className="share-buttons-wrapper">
  <div className="share-buttons">
    <FacebookShareButton url={url} hashtag="#sapluna">
      <FacebookIcon size={32} round />
    </FacebookShareButton>

    <TwitterShareButton url={url} title={title}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>

    <WhatsappShareButton url={url} title={title}>
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>

    <LinkedinShareButton url={url} title={title}>
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>

    <EmailShareButton url={url} subject={title} body="Katso tämä artikkeli:">
      <EmailIcon size={32} round />
    </EmailShareButton>
  </div>

  <div className="share-copy-wrapper">
    <div className="share-copy">
      <input type="text" value={url} readOnly />
      <button onClick={handleCopy} title="Kopioi linkki">
        {copied ? "✓" : "⧉"}
      </button>
    </div>
  </div>
</div>

  );
}
