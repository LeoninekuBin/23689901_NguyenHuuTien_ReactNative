import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BOOKS } from "../../data";

export default function CartScreen() {
  const cartBooks = BOOKS.slice(0, 3);

  const total = cartBooks.reduce(
    (sum, book) => sum + book.price,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {cartBooks.map((book) => (
          <View key={book.id} style={styles.row}>
            <Image
              source={{ uri: book.cover }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>
                {book.title}
              </Text>

              <Text style={styles.author}>
                {book.author}
              </Text>
            </View>

            <View style={styles.quantity}>
              <Text style={styles.quantityText}>
                x1
              </Text>
            </View>

            <Text style={styles.price}>
              {book.price.toLocaleString("vi-VN")} đ
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng tiền</Text>

          <Text style={styles.totalPrice}>
            {total.toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>
            Thanh toán
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  scroll: {
    flex: 1,
  },

  list: {
    padding: 16,
    paddingBottom: 20,
    gap: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
  },

  image: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },

  bookInfo: {
    flex: 1,
    marginHorizontal: 12,
  },

  bookTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  author: {
    fontSize: 13,
    color: "#64748B",
  },

  quantity: {
    width: 40,
    alignItems: "center",
  },

  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  price: {
    width: 90,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
  },

  checkoutBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  totalLabel: {
    fontSize: 13,
    color: "#64748B",
  },

  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#DC2626",
  },

  checkoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },

  checkoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});