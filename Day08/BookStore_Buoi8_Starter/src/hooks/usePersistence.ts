import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage"; // đã viết sẵn
import { loadJSON } from "../storage/storage"; // đã viết sẵn
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types"; // dùng khi đọc loadJSON<CartItem[]>

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

// Mở app → nạp dữ liệu đã lưu; sau đó mọi thay đổi tự ghi lại. App.tsx chỉ hiện màn hình chính khi ready = true.
export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    (async () => {
      // đọc đồng thời 3 thông tin từ AsyncStorage: auth, giỏ hàng và danh sách yêu thích
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),
        loadJSON<number[]>(WISHLIST_KEY),
      ]);
      // nếu có thông tin đăng nhập hợp lệ thì khôi phục phiên vào Redux (auto-login)
      if (auth?.token && auth.user) dispatch(setCredentials(auth));
      // nếu có giỏ hàng đã lưu thì khôi phục vào Redux store
      if (cart) dispatch(hydrateCart(cart));
      // nếu có danh sách yêu thích đã lưu thì khôi phục vào Redux store
      if (wish) dispatch(hydrateWishlist(wish));
      // đánh dấu ứng dụng đã nạp xong dữ liệu khởi đầu
      setReady(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    // có user và token thì lưu phiên đăng nhập; ngược lại đã đăng xuất thì xóa phiên
    if (user && token) {
      saveAuth({ user, token });
    } else {
      clearAuth();
    }
  }, [ready, user, token]);

  // tự động lưu giỏ hàng vào AsyncStorage mỗi khi cartItems thay đổi
  useAutoPersist(CART_KEY, cartItems, ready);
  // tự động lưu danh sách yêu thích vào AsyncStorage mỗi khi wishlistIds thay đổi
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}
