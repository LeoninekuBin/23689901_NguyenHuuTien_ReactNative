import { useEffect, useState } from "react";

// trả về giá trị "đã trễ": chỉ cập nhật sau khi người dùng ngừng thay đổi delay ms
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // mỗi lần value đổi: đặt một hẹn giờ mới
    const t = setTimeout(() => setDebounced(value), delay);
    // hàm dọn dẹp chạy trước lần effect kế tiếp 
    // huỷ hẹn giờ cũ -> gõ liên tục thì chỉ lần gõ cuối cùng được áp dụng
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}