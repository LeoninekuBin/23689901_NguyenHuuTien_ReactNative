import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog"; // đã viết sẵn — dùng ở BT8.7a
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice, radius } from "../theme";

// Danh sách mã giảm giá cố định phía client (BT8.C2)
const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000đ", discount: (s) => Math.min(50000, s) },
};

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  // đọc giỏ hàng + tổng tiền từ Redux thông qua hook adapter useCart()
  const { items, totalPrice, setQty, remove } = useCart();
  // lấy trạng thái đăng nhập từ Redux thông qua useAuth()
  const { isLoggedIn } = useAuth();

  // state quản lý mã giảm giá
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  // tính số tiền được giảm giá và tổng tiền cuối cùng sau khi áp mã
  const discount = coupon ? COUPONS[coupon].discount(totalPrice) : 0;
  const finalTotal = totalPrice - discount;

  // hàm kiểm tra và áp dụng mã giảm giá
  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setCoupon(code);
      setCouponMsg(`Đã áp dụng ${code}: ${COUPONS[code].label}`);
    } else {
      setCoupon(null);
      setCouponMsg("Mã giảm giá không hợp lệ");
    }
  };

  // hàm xác nhận trước khi xóa sản phẩm khỏi giỏ hàng (BT8.7a)
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog(
      "Xóa sản phẩm",
      `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`,
      () => remove(bookId)
    );
  };

  // chuyển sang màn thanh toán: nếu chưa đăng nhập thì chuyển hướng sang Login kèm redirectTo (BT8.4)
  const goCheckout = () => {
    if (isLoggedIn) {
      navigation.navigate("Checkout", { total: finalTotal });
    } else {
      navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Giỏ hàng trống"
            message="Hãy chọn vài cuốn sách yêu thích nhé."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Home")}
          />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          {/* cụm nhập mã giảm giá (BT8.C2) */}
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              placeholder="Mã giảm giá (SALE10)"
              placeholderTextColor={colors.muted}
              value={couponInput}
              onChangeText={setCouponInput}
              autoCapitalize="characters"
            />
            <Pressable style={styles.couponBtn} onPress={applyCoupon}>
              <Text style={styles.couponBtnText}>Áp dụng</Text>
            </Pressable>
          </View>
          {couponMsg ? (
            <Text style={[styles.couponMsg, coupon ? styles.couponSuccess : styles.couponError]}>
              {couponMsg}
            </Text>
          ) : null}

          {/* dòng tạm tính */}
          <View style={styles.line}>
            <Text style={styles.muted}>Tạm tính</Text>
            <Text style={styles.value}>{formatPrice(totalPrice)}</Text>
          </View>

          {/* dòng giảm giá nếu có áp mã */}
          {discount > 0 && (
            <View style={styles.line}>
              <Text style={styles.discountLabel}>Giảm giá</Text>
              <Text style={styles.discountValue}>-{formatPrice(discount)}</Text>
            </View>
          )}

          {/* dòng tổng cộng sau khi giảm giá */}
          <View style={styles.line}>
            <Text style={styles.total}>Tổng cộng</Text>
            <Text style={styles.total}>{formatPrice(finalTotal)}</Text>
          </View>

          {/* nút bấm tiến hành thanh toán */}
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  couponRow: { flexDirection: "row", gap: 8 },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.text,
    backgroundColor: "#fff",
  },
  couponBtn: {
    backgroundColor: colors.indigo,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  couponBtnText: { color: "#fff", fontWeight: "700" },
  couponMsg: { fontSize: 13, fontWeight: "600" },
  couponSuccess: { color: "#16A34A" },
  couponError: { color: colors.danger },
  line: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  discountLabel: { color: "#16A34A", fontWeight: "600" },
  discountValue: { color: "#16A34A", fontWeight: "700" },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
});
