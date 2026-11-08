import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BookGrid } from "../components/BookGrid"; // lưới 2 cột dùng lại
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors } from "../theme";

// Màn hình hiển thị danh sách các cuốn sách đã được người dùng thả tim yêu thích
export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  // lấy danh sách id các cuốn sách yêu thích từ Redux store qua hook useWishlist()
  const { ids } = useWishlist();

  // khai báo các state quản lý danh sách sách từ API và trạng thái tải dữ liệu
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // hàm tải tất cả sách từ server (kèm xử lý loading và lỗi)
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  // gọi API tải dữ liệu khi component được mount
  useEffect(() => {
    load();
  }, [load]);

  // lọc danh sách sách yêu thích: chỉ lấy những cuốn sách có id nằm trong mảng ids của wishlist
  const favorites = useMemo(() => books.filter((b) => ids.includes(b.id)), [books, ids]);

  // hiển thị màn hình chờ khi đang tải dữ liệu từ API
  if (loading) return <LoadingView />;
  // hiển thị màn hình báo lỗi và nút thử lại nếu không kết nối được API
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      {/* hiển thị lưới sách yêu thích bằng component BookGrid */}
      <BookGrid
        data={favorites}
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        ListEmptyComponent={
          <EmptyState
            emoji="💔"
            title="Chưa có sách yêu thích"
            message="Nhấn ♡ trên mỗi cuốn sách để lưu lại ở đây."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
});
