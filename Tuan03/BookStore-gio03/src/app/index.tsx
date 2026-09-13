import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { BOOKS } from "../../data";

export default function HomeScreen() {
  const handlePressBook = (id: number) => {
    console.log("Book:", id);
  };

  const handlePressCart = () => {
    console.log("Cart pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BookGrid
          books={BOOKS}
          onPressBook={handlePressBook}
        />
      </ScrollView>

      <FloatingCartButton
        count={3}
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
  },
});