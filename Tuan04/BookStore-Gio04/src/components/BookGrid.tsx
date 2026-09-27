import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../../data";
import { DiscountBadge } from "./DiscountBadge";

const USE_GAP_LAYOUT = false;
const COLUMNS = USE_GAP_LAYOUT ? 3 : 2;
const GAP = 12;

const GAP_ITEM_WIDTH = COLUMNS === 3 ? "30%" : "48%";

export function BookGrid({
  books,
  onPressBook,
}: {
  books: Book[];
  onPressBook: (id: number) => void;
}) {
  return (
    <View
      style={[
        styles.grid,
        USE_GAP_LAYOUT
          ? { gap: GAP }
          : { justifyContent: "space-between" },
      ]}
    >
      {books.map((book) => (
        <Pressable
          key={book.id}
          style={[
            styles.item,
            {
              width: USE_GAP_LAYOUT
                ? GAP_ITEM_WIDTH
                : "48%",
            },
          ]}
          onPress={() => onPressBook(book.id)}
        >
          <View style={styles.coverWrap}>
            <Image
              source={{ uri: book.cover }}
              style={styles.cover}
            />

            <DiscountBadge
              discountPercent={book.discountPercent}
              isNew={book.isNew}
            />
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>

          <Text style={styles.price}>
            {book.price.toLocaleString()} đ
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  item: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  coverWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#EEF2F7",
  },

  cover: {
    width: "100%",
    height: "100%",
  },

  title: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  price: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});