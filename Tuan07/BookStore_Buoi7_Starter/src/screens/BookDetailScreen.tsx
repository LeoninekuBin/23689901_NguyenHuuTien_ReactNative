import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart, useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  // bookId do màn Home gửi sang qua navigate("BookDetail", { bookId })
  const { bookId } = route.params;
  const { add } = useCart();
  const { isFavorite, toggle } = useWishlist(); // C1: danh sách yêu thích

  // 3 state của gọi API: dữ liệu / đang tải / lỗi
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback giữ hàm load ổn định giữa các lần render, nên dùng được trong useEffect
  // và truyền cho nút "Thử lại" mà không gây vòng lặp.
  const load = useCallback(async () => {
    setLoading(true);
    setError(null); // xoá lỗi cũ khi thử lại
    try {
      setBook(await getBookById(bookId));
    } catch (e) {
      setError(getErrorMessage(e)); 
    } finally {
      setLoading(false); // dù thành công hay lỗi đều tắt loading
    }
  }, [bookId]);

  // chạy khi mở màn, và chạy lại nếu bookId đổi
  useEffect(() => {
    load();
  }, [load]);



  if (loading) return <LoadingView label="Đang tải sách…" />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.title}>{book.title}</Text>
        {/* C1: nút tim; giao diện chỉ gọi toggle/isFavorite của hook */}
        <Pressable onPress={() => toggle(book.id)} hitSlop={10}>
          <Text style={styles.heart}>{isFavorite(book.id) ? "♥" : "♡"}</Text>
        </Pressable>
      </View>

      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>

      <Pressable
        style={styles.btn}
        onPress={() =>
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          })
        }
      >
        <Text style={styles.btnText}>Thêm vào giỏ</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  title: { flex: 1, fontSize: 22, fontWeight: "800", color: colors.text },
  heart: { fontSize: 30, color: colors.heart },
  author: { color: colors.muted, fontSize: 15 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginTop: 4 },
  btn: { backgroundColor: colors.indigo, padding: 14, borderRadius: radius.md, alignItems: "center", marginTop: 12 },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});