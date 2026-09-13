import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Header } from "../components/Header";
import { BookRowCard } from "../components/BookRowCard";
import { BOOKS } from "../../data";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {BOOKS.map((book) => (
          <BookRowCard
            key={book.id}
            book={book}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
    gap: 12,
  },
});