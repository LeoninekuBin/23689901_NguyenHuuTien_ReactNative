import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { BOOKS } from "../../data";

export default function HomeScreen() {
  const [cartCount, setCartCount] = useState(0);

  const handlePressBook = (id: number) => {
    console.log("Book:", id);
  };

  const handlePressCart = () => {
    setCartCount((count) => count + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        <CategoryChips />

        <BookGrid
          books={BOOKS}
          onPressBook={handlePressBook}
        />
      </ScrollView>

      <FloatingCartButton
        count={cartCount}
        onPress={handlePressCart}
      />
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
    paddingBottom: 100,
    gap: 4,
  },
});