import { Book } from "../types";

// Bỏ dấu tiếng Việt để "nha gia kim" vẫn tìm ra "Nhà Giả Kim"  (ĐÃ VIẾT SẴN — chỉ cần gọi)
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null;

export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

// C2: kiểm tra giá có nằm trong khoảng đã chọn không (null = không lọc theo giá)
const inRange = (price: number, r: PriceRange): boolean => {
  if (r === null) return true;
  if (r === "lt100") return price < 100000;
  if (r === "100to300") return price >= 100000 && price <= 300000;
  return price > 300000; // "gt300"
};

export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}

// Lọc kết hợp: sách phải thoả cả 3 điều kiện 
export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const k = normalize(f.keyword); // bỏ dấu + chữ thường: "DAC NHAN" khớp "Đắc Nhân Tâm"
  return books.filter(
    (b) =>
      // 7.7c: từ khoá rỗng = giữ tất cả; ngược lại khớp tên hoặc tác giả
      (k === "" || normalize(b.title).includes(k) || normalize(b.author).includes(k)) &&
      // 7.8a: danh mục null = tất cả, ngược lại phải đúng danh mục
      (f.categoryId === null || b.categoryId === f.categoryId) &&
      // C2: khoảng giá
      inRange(b.price, f.priceRange)
  );
}
