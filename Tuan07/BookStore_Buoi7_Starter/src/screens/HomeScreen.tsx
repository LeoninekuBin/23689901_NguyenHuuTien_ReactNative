import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { useCart } from "../store/hooks";
import { filterBooks, PriceRange } from "../utils/filters";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors, radius } from "../theme";

type SortOrder = "asc" | "desc" | null; // câu 5: sắp xếp theo giá

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  // 7.3d: lấy tổng số lượng từ giỏ hàng để hiện trên nút giỏ nổi
  const { totalQuantity } = useCart();

  // 7.5b: dữ liệu từ API + 2 trạng thái loading/error
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // hai API độc lập nhau -> gọi song song bằng Promise.all 
      // lưu ý: chỉ cần 1 trong 2 lỗi thì cả Promise.all bị lỗi
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // state của bộ lọc
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<SortOrder>(null);

  
  const debouncedKeyword = useDebounce(keyword, 400);

  // 7.7c: danh sách hiển thị = lọc kết hợp, rồi sắp xếp.
  // useMemo: chỉ tính lại khi một trong các giá trị phụ thuộc đổi.
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    if (sort === null) return filtered;
    // sao chép mảng ([...]) trước khi sort vì sort() làm thay đổi mảng gốc
    return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  }, [books, debouncedKeyword, categoryId, priceRange, sort]);

  // 7.8b: tab Danh mục gửi categoryId sang -> áp dụng, rồi xóa params để lần sau
  // quay lại Home không bị áp dụng lại.
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  // 7.7e: có bộ lọc nào đang bật không? 
  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null;
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };

  // bấm nút đang chọn lần nữa thì bỏ sắp xếp (về null), giống chip danh mục
  const toggleSort = (s: Exclude<SortOrder, null>) => setSort((cur) => (cur === s ? null : s));

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}

      {/* 7.5c: 3 trạng thái: đang tải -> lỗi (có Thử lại) -> có dữ liệu */}
      {loading ? (
        <LoadingView label="Đang tải sách…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <BookGrid
          data={visibleBooks}
          // 7.2a: bấm sách -> sang màn chi tiết, gửi kèm bookId
          onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
          ListHeaderComponent={
            <View>
              <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
              <PriceFilter value={priceRange} onChange={setPriceRange} />
              <View style={styles.toolbar}>
                <Pressable style={[styles.pill, sort === "asc" && styles.pillActive]} onPress={() => toggleSort("asc")}>
                  <Text style={[styles.pillText, sort === "asc" && styles.pillTextActive]}>Giá tăng ↑</Text>
                </Pressable>
                <Pressable style={[styles.pill, sort === "desc" && styles.pillActive]} onPress={() => toggleSort("desc")}>
                  <Text style={[styles.pillText, sort === "desc" && styles.pillTextActive]}>Giá giảm ↓</Text>
                </Pressable>
                {/* 7.7e: chỉ hiện khi đang có bộ lọc */}
                {hasFilter && (
                  <Pressable style={styles.clearBtn} onPress={clearFilters}>
                    <Text style={styles.clearText}>✕ Xóa bộ lọc</Text>
                  </Pressable>
                )}
              </View>
            </View>
          }
          // 7.7d: không có sách nào khớp bộ lọc
          ListEmptyComponent={
            <EmptyState
              emoji="🔎"
              title="Không tìm thấy sách phù hợp"
              message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
              actionLabel="Xóa bộ lọc"
              onAction={clearFilters}
            />
          }
        />
      )}

      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  toolbar: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingBottom: 8, flexWrap: "wrap" },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  pillActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  pillText: { color: colors.text, fontWeight: "600", fontSize: 13 },
  pillTextActive: { color: "#fff" },
  clearBtn: { marginLeft: "auto", paddingVertical: 6 },
  clearText: { color: colors.danger, fontWeight: "700" },
});