import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BOOKS } from "../../data";

export default function BookDetailScreen() {
  const book = BOOKS[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: book.cover }}
          style={styles.cover}
          resizeMode="contain"
        />

        <Text style={styles.title}>{book.title}</Text>

        <Text style={styles.author}>
          Tác giả: {book.author}
        </Text>

        <Text style={styles.price}>
          {book.price.toLocaleString("vi-VN")} đ
        </Text>

        <View style={styles.divider} />

        <Text style={styles.descriptionTitle}>
          Mô tả sách
        </Text>

        <Text style={styles.description}>
          {book.description}
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Giá</Text>
          <Text style={styles.bottomPrice}>
            {book.price.toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <View style={styles.cartButton}>
          <Text style={styles.cartButtonText}>
            Thêm vào giỏ
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 24,
  },

  cover: {
    width: 220,
    aspectRatio: 0.7,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },

  author: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 12,
  },

  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 16,
  },

  descriptionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },

  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#475569",
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  bottomLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 2,
  },

  bottomPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#DC2626",
  },

  cartButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },

  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});