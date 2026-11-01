import { api } from "../api/client";
import { Book } from "../types";

export interface BookQuery {
  categoryId?: number;
  q?: string;
}

// Component KHÔNG gọi axios trực tiếp; mọi lời gọi API nằm ở thư mục services.
// hàm trả về Promise<Book[]> nên nơi gọi có sẵn kiểu dữ liệu.
export async function getBooks(params?: BookQuery): Promise<Book[]> {
  // params biến thành query string, ví dụ { categoryId: 1 } -> /books?categoryId=1
  const res = await api.get<Book[]>("/books", { params });
  return res.data;
}

export async function getBookById(id: number): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}