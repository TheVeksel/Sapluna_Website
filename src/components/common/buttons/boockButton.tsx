import React from "react";
import { useDispatch } from "react-redux";
import { openPopup } from "../../../store/slices/boocking";

interface BoockButtonProps {
  children: React.ReactNode;
  color?: string; 
}

export default function BoockButton({  children, color = "#ffedd5" }: BoockButtonProps) {
  const dispatch = useDispatch();
  
  return (
    <button
      className="custom-button"
      onClick={() => dispatch(openPopup())}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}
