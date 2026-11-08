import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

// Hàng hiển thị từng cuốn sách trong giỏ hàng: có nút tăng/giảm với debounce và kiểm tra tồn kho
export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // 1) lưu số lượng ở state cục bộ để giao diện phản hồi tức thì khi bấm nút
  const [qty, setQty] = useState(item.quantity);
  // sử dụng hook useDebounce để trì hoãn việc gửi cập nhật lên Redux store 300ms sau lần bấm cuối
  const debouncedQty = useDebounce(qty, 300);

  // 2) chỉ đẩy số lượng mới lên Redux store khi giá trị debounce khác với giá trị hiện tại trong item
  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty]);

  // 3) đồng bộ lại state cục bộ khi store bên ngoài thay đổi (ví dụ nạp từ storage hoặc xoá/thêm lại)
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  // 4) điều kiện giảm (ít nhất 1 cuốn) và tăng (không vượt quá số lượng tồn kho)
  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      {/* ảnh bìa sách */}
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      {/* thông tin sách: tiêu đề, giá và cụm tăng/giảm */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>

        {/* cụm nút bấm tăng/giảm số lượng và hiển thị tồn kho */}
        <View style={styles.stepper}>
          <Pressable
            disabled={!canDec}
            onPress={() => setQty((q) => q - 1)}
            accessibilityLabel="Giảm"
            style={[styles.btnQty, !canDec && styles.btnDisabled]}
            hitSlop={4}
          >
            <Text style={styles.btnQtyText}>−</Text>
          </Pressable>

          <Text style={styles.qtyText}>{qty}</Text>

          <Pressable
            disabled={!canInc}
            onPress={() => setQty((q) => q + 1)}
            accessibilityLabel="Tăng"
            style={[styles.btnQty, !canInc && styles.btnDisabled]}
            hitSlop={4}
          >
            <Text style={styles.btnQtyText}>+</Text>
          </Pressable>

          <Text style={styles.stockText}>Còn {item.stock}</Text>
        </View>
      </View>

      {/* nút thùng rác xóa sản phẩm khỏi giỏ */}
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stepper: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  btnQty: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#EAEFFD", alignItems: "center", justifyContent: "center" },
  btnDisabled: { opacity: 0.35 },
  btnQtyText: { fontSize: 16, fontWeight: "800", color: colors.navy },
  qtyText: { fontSize: 15, fontWeight: "700", minWidth: 20, textAlign: "center", color: colors.navy },
  stockText: { fontSize: 12, color: colors.muted, marginLeft: 4 },
  trash: { fontSize: 22 },
});
