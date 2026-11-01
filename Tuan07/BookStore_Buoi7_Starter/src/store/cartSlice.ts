import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}
const initialState: CartState = { items: [] };

// ép số lượng nằm trong [1, stock]: không bao giờ < 1 và không vượt tồn kho
const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // thêm sách vào giỏ. Payload là CartItem nhưng chưa có quantity 
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) {
        // đã có trong giỏ -> tăng 1 và không được vượt tồn kho
        found.quantity = clamp(found.quantity + 1, found.stock);
      } else {
        // chưa có -> thêm mới với số lượng 1
       
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // xoá một sách khỏi giỏ và giữ lại các item có bookId khác payload
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    // đặt số lượng cụ thể, vẫn bị chặn bởi stock
    setQuantity(state, action: PayloadAction<{ bookId: number; quantity: number }>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) found.quantity = clamp(action.payload.quantity, found.stock);
    },
    // làm rỗng giỏ 
    clearCart(state) {
      state.items = [];
    },
    //  nạp lại giỏ hàng đã lưu trong AsyncStorage
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;