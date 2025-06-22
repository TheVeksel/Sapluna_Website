import { ProductCategory } from '../../../api/wpApi';

interface ShopBannerProps {
  category: ProductCategory | null;
}

const ShopBanner: React.FC<ShopBannerProps> = ({ category }) => {
  if (!category?.acf) return null;

  const bannerImage = category.acf.image_banner;
  const welcomeTitle = category.acf.welcome_title;
  const welcomeText = category.acf.welcome_text;

  return (
    <>
      {bannerImage && (
        <div
          className="shop__banner"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="shop__banner-overlay" />
        </div>
      )}
      
      {(welcomeTitle || welcomeText) && (
        <div className="shop__welcome">
          <h1>{String(welcomeTitle)}</h1>
          <p>{String(welcomeText)}</p>
        </div>
      )}
    </>
  );
};

export default ShopBanner;