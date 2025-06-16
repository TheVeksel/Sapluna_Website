import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AddToCartButton.scss";
import { License, Product } from "../../../pages/PricingPage/PopUps/OrderPopUp";
import { RootState } from "../../../../store/store";

interface AddToCartButtonProps {
  size: "small" | "medium" | "big";
  product?: Product | License;
  onAddToCart?: (product: Product | License) => void;
}

export default function AddToCartButton({
  size,
  product,
  onAddToCart,
}: AddToCartButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const sizeClass = {
    small: "button-small",
    medium: "button-medium",
    big: "button-big",
  }[size];

  useEffect(() => {
    if (!product) return;

    const isLicense = "licenseType" in product;
    const isInCart = cartItems.some(
      (item) =>
        item.id === product.id &&
        item.type === (isLicense ? "license" : "product")
    );

    setIsClicked(isInCart);
  }, [cartItems, product]);

  const handleClick = () => {
    if (onAddToCart && product) {
      onAddToCart(product);
      setIsClicked(true);
    }
  };

  return !isClicked ? (
    <button className={`button-not-clicked ${sizeClass}`} onClick={handleClick}>
      Lisää ostoskoriin
    </button>
  ) : (
    <Link to="/cart">
      <button className={`button-clicked ${sizeClass}`}>Siirry ostoskoriin</button>
    </Link>
  );
}
