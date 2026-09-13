import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { BOOKS } from "../../data";

export default function HomeScreen() {
  const handlePressBook = (id: number) => {
    console.log("Book:", id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          Danh mục sách
        </Text>

        <CategoryChips />

        <Text style={styles.heading}>
          Sách nổi bật
        </Text>

        <BookGrid
          books={BOOKS}
          onPressBook={handlePressBook}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
    gap: 4,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 8,
    color: "#1E1B4B",
  },
});