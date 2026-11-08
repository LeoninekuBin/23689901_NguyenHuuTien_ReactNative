import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useWishlist } from "../store/hooks";
import { colors } from "../theme";

interface Props {
  bookId: number;
  size?: number;
  style?: ViewStyle;
}

// Nút thả tim dùng chung cho BookCard ở trang chủ và BookDetail: đồng bộ chung một Redux store
export function HeartButton({ bookId, size = 34, style }: Props) {
  // đọc trạng thái yêu thích của cuốn sách và hàm toggle từ Redux qua hook useWishlist()
  const { isFavorite, toggle } = useWishlist();
  const fav = isFavorite(bookId);

  return (
    <Pressable
      style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }, style]}
      onPress={() => toggle(bookId)}
      accessibilityLabel={fav ? "Bỏ yêu thích" : "Yêu thích"}
      hitSlop={6}
    >
      {/* nếu đã thích thì hiện tim đặc màu đỏ ♥, ngược lại tim rỗng màu xám ♡ */}
      <Text style={{ fontSize: size * 0.55, color: fav ? colors.heart : colors.muted }}>
        {fav ? "♥" : "♡"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { position: "absolute", top: 8, right: 8, backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center", zIndex: 2 },
});
