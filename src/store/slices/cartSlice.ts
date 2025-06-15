import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  type: "product" | "license";
  image?: string;
  omistaja?: number;
  tuottaja?: number;
  quantity?: number; 
};

type CartState = {
  items: CartItem[];
};

const loadCartFromStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        const quantity = action.payload.type === "license" 
          ? 1 
          : action.payload.quantity || 1;
        
        state.items.push({ ...action.payload, quantity });
        saveCartToStorage(state.items);
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      
      if (item && item.type === "product") {
        item.quantity = quantity;
        saveCartToStorage(state.items);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;